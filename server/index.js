/**
 * Простой сервер для работы с PostgreSQL
 * 
 * Запуск: node server/index.js
 * 
 * Требования:
 * - npm install express pg cors dotenv
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'game_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
});

// Проверка подключения
pool.on('connect', () => {
    console.log('✅ Подключено к PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ Ошибка PostgreSQL:', err);
});

// ============================================
// АВТОРИЗАЦИЯ
// ============================================

// Регистрация (упрощённая версия, без хеширования паролей для разработки)
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, username } = req.body;
        
        // Проверяем, существует ли пользователь
        const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ success: false, error: 'Пользователь уже существует' });
        }
        
        // Создаём пользователя (в продакшене нужно хешировать пароль!)
        const result = await pool.query(
            'INSERT INTO users (email, password_hash, username) VALUES ($1, $2, $3) RETURNING id, email, username',
            [email, password, username || email.split('@')[0]]
        );
        
        const user = result.rows[0];
        const token = `token_${user.id}_${Date.now()}`;
        
        res.json({ success: true, user, token });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Вход
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const result = await pool.query(
            'SELECT id, email, username, password_hash FROM users WHERE email = $1',
            [email]
        );
        
        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, error: 'Неверный email или пароль' });
        }
        
        const user = result.rows[0];
        
        // В продакшене нужно использовать bcrypt.compare!
        if (user.password_hash !== password) {
            return res.status(401).json({ success: false, error: 'Неверный email или пароль' });
        }
        
        const token = `token_${user.id}_${Date.now()}`;
        
        res.json({
            success: true,
            user: { id: user.id, email: user.email, username: user.username },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ============================================
// СОХРАНЕНИЯ
// ============================================

// Сохранить игру
app.put('/api/:userId/saves/:slotId', async (req, res) => {
    try {
        const { userId, slotId } = req.params;
        const saveData = req.body;
        
        await pool.query(
            `INSERT INTO saves (user_id, slot_id, data, updated_at) 
             VALUES ($1, $2, $3, NOW()) 
             ON CONFLICT (user_id, slot_id) 
             DO UPDATE SET data = $3, updated_at = NOW()`,
            [userId, slotId, JSON.stringify(saveData)]
        );
        
        res.json({ success: true });
    } catch (error) {
        console.error('Save error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Загрузить игру
app.get('/api/:userId/saves/:slotId', async (req, res) => {
    try {
        const { userId, slotId } = req.params;
        
        const result = await pool.query(
            'SELECT data FROM saves WHERE user_id = $1 AND slot_id = $2',
            [userId, slotId]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Сохранение не найдено' });
        }
        
        res.json(result.rows[0].data);
    } catch (error) {
        console.error('Load error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Список сохранений
app.get('/api/:userId/saves', async (req, res) => {
    try {
        const { userId } = req.params;
        
        const result = await pool.query(
            'SELECT slot_id, updated_at FROM saves WHERE user_id = $1 ORDER BY updated_at DESC',
            [userId]
        );
        
        res.json({ keys: result.rows.map(r => r.slot_id) });
    } catch (error) {
        console.error('List saves error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Удалить сохранение
app.delete('/api/:userId/saves/:slotId', async (req, res) => {
    try {
        const { userId, slotId } = req.params;
        
        await pool.query(
            'DELETE FROM saves WHERE user_id = $1 AND slot_id = $2',
            [userId, slotId]
        );
        
        res.json({ success: true });
    } catch (error) {
        console.error('Delete save error:', error);
        res.status(500).json({ error: error.message });
    }
});

// ============================================
// ЗАПУСК СЕРВЕРА
// ============================================

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    console.log(`📊 API доступен по адресу http://localhost:${PORT}/api`);
});
