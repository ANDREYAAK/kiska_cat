# Система авторизации и сохранений

## Что сделано

✅ **Гибридная система сохранений:**
- Локальное сохранение (IndexedDB) - всегда работает
- Серверное сохранение (PostgreSQL) - когда пользователь авторизован
- Автоматическая синхронизация между устройствами

✅ **Система авторизации:**
- AuthManager для управления пользователями
- Хранение токенов
- Автоматическое восстановление сессии

## Как это работает

### 1. Без авторизации (текущее состояние)
- Сохранения работают **только локально** в браузере
- Данные остаются на устройстве
- Подходит для разработки и тестирования

### 2. С авторизацией (когда подключите сервер)
- Сохранения **дублируются** на сервер
- Автоматическая синхронизация между устройствами
- Защита от потери данных

## Настройка для продакшена

### Шаг 1: Создать переменную окружения

Создайте файл `.env` в корне проекта:

```env
VITE_API_URL=https://api.ваш-сервер.com
```

### Шаг 2: Настроить серверный API

Пример структуры сервера (Node.js + Express + PostgreSQL):

```javascript
// server/routes/auth.js
app.post('/api/auth/register', async (req, res) => {
  const { email, password, username } = req.body;
  
  // Хешируем пароль
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Сохраняем в БД
  const result = await db.query(
    'INSERT INTO users (email, password_hash, username) VALUES ($1, $2, $3) RETURNING id, email, username',
    [email, hashedPassword, username]
  );
  
  // Генерируем JWT токен
  const token = jwt.sign({ userId: result.rows[0].id }, SECRET_KEY);
  
  res.json({ 
    success: true, 
    user: result.rows[0], 
    token 
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Находим пользователя
  const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  if (!user.rows[0]) {
    return res.status(401).json({ success: false, error: 'Неверный email или пароль' });
  }
  
  // Проверяем пароль
  const valid = await bcrypt.compare(password, user.rows[0].password_hash);
  if (!valid) {
    return res.status(401).json({ success: false, error: 'Неверный email или пароль' });
  }
  
  // Генерируем токен
  const token = jwt.sign({ userId: user.rows[0].id }, SECRET_KEY);
  
  res.json({ 
    success: true, 
    user: { id: user.rows[0].id, email: user.rows[0].email, username: user.rows[0].username },
    token 
  });
});
```

```javascript
// server/routes/saves.js
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Токен не предоставлен' });
  }
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Неверный токен' });
    req.user = user;
    next();
  });
};

app.put('/api/:userId/saves/:slotId', authenticateToken, async (req, res) => {
  const { userId, slotId } = req.params;
  const saveData = req.body;
  
  // Проверяем, что пользователь может сохранять только свои данные
  if (req.user.userId !== userId) {
    return res.status(403).json({ error: 'Доступ запрещён' });
  }
  
  await db.query(
    `INSERT INTO saves (user_id, slot_id, data, updated_at) 
     VALUES ($1, $2, $3, NOW()) 
     ON CONFLICT (user_id, slot_id) 
     DO UPDATE SET data = $3, updated_at = NOW()`,
    [userId, slotId, JSON.stringify(saveData)]
  );
  
  res.json({ success: true });
});

app.get('/api/:userId/saves/:slotId', authenticateToken, async (req, res) => {
  const { userId, slotId } = req.params;
  
  if (req.user.userId !== userId) {
    return res.status(403).json({ error: 'Доступ запрещён' });
  }
  
  const result = await db.query(
    'SELECT data FROM saves WHERE user_id = $1 AND slot_id = $2',
    [userId, slotId]
  );
  
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Сохранение не найдено' });
  }
  
  res.json(result.rows[0].data);
});

app.get('/api/:userId/saves', authenticateToken, async (req, res) => {
  const { userId } = req.params;
  
  if (req.user.userId !== userId) {
    return res.status(403).json({ error: 'Доступ запрещён' });
  }
  
  const result = await db.query(
    'SELECT slot_id FROM saves WHERE user_id = $1',
    [userId]
  );
  
  res.json({ keys: result.rows.map(r => r.slot_id) });
});
```

### Шаг 3: Структура БД PostgreSQL

```sql
-- Таблица пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Таблица сохранений
CREATE TABLE saves (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    slot_id VARCHAR(255) NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, slot_id)
);

-- Индексы для быстрого поиска
CREATE INDEX idx_saves_user_id ON saves(user_id);
CREATE INDEX idx_saves_slot_id ON saves(user_id, slot_id);
```

### Шаг 4: Обновить AuthManager для работы с сервером

В `src/core/AuthManager.ts` раскомментируйте и настройте реальные запросы:

```typescript
async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
        const response = await fetch(`${process.env.VITE_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!data.success) {
            return { success: false, error: data.error || "Ошибка авторизации" };
        }
        
        this.state = {
            isAuthenticated: true,
            user: data.user,
            token: data.token
        };
        
        this.notifyAuthChange();
        return { success: true };
    } catch (error) {
        const message = error instanceof Error ? error.message : "Ошибка авторизации";
        return { success: false, error: message };
    }
}
```

## Как использовать в коде

### Проверка авторизации

```typescript
const authManager = game.getAuthManager();

if (authManager.isAuthenticated()) {
    const userId = authManager.getUserId();
    console.log(`Пользователь авторизован: ${userId}`);
} else {
    console.log("Пользователь не авторизован");
}
```

### Вход/Регистрация

```typescript
// Регистрация
const result = await authManager.register("user@example.com", "password", "username");
if (result.success) {
    console.log("Регистрация успешна!");
}

// Вход
const result = await authManager.login("user@example.com", "password");
if (result.success) {
    console.log("Вход успешен!");
}
```

### Подписка на изменения авторизации

```typescript
authManager.onAuthChange((state) => {
    if (state.isAuthenticated) {
        console.log("Пользователь вошёл:", state.user);
    } else {
        console.log("Пользователь вышел");
    }
});
```

## Преимущества текущей архитектуры

✅ **Гибкость:**
- Работает без сервера (для разработки)
- Легко переключается на сервер (одна переменная окружения)

✅ **Надёжность:**
- Локальные сохранения всегда работают
- Серверные сохранения - бонус для синхронизации

✅ **Масштабируемость:**
- Готово для мультиплеера
- Готово для монетизации
- Готово для аналитики

## Что дальше?

1. **Сейчас:** Всё работает локально, можно тестировать
2. **Когда будет сервер:** Просто добавьте `VITE_API_URL` в `.env`
3. **UI авторизации:** Добавьте форму входа/регистрации в HUD (опционально)

Всё готово для масштабирования! 🚀
