/**
 * AuthManager - Менеджер авторизации пользователей
 * 
 * Управляет:
 * - Авторизацией пользователя
 * - Хранением токенов
 * - Получением userId для сохранений
 */
export interface User {
    id: string;
    email?: string;
    username?: string;
    avatar?: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
}

export class AuthManager {
    private state: AuthState = {
        isAuthenticated: false,
        user: null,
        token: null
    };

    private readonly STORAGE_KEY = "game_auth";
    private onAuthChangeCallbacks: Array<(state: AuthState) => void> = [];

    constructor() {
        // Пытаемся восстановить сессию из localStorage
        this.loadFromStorage();
    }

    /**
     * Зарегистрировать колбэк на изменение состояния авторизации
     */
    onAuthChange(callback: (state: AuthState) => void): void {
        this.onAuthChangeCallbacks.push(callback);
    }

    /**
     * Уведомить всех подписчиков об изменении
     */
    private notifyAuthChange(): void {
        this.saveToStorage();
        for (const callback of this.onAuthChangeCallbacks) {
            callback(this.state);
        }
    }

    /**
     * Войти (авторизоваться)
     * В будущем здесь будет запрос к серверу
     */
    async login(email: string, _password: string): Promise<{ success: boolean; error?: string }> {
        try {
            // TODO: Заменить на реальный запрос к серверу
            // const response = await fetch("/api/auth/login", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ email, password })
            // });
            // const data = await response.json();

            // Временная заглушка для разработки
            const mockUser: User = {
                id: `user_${Date.now()}`,
                email,
                username: email.split("@")[0]
            };

            this.state = {
                isAuthenticated: true,
                user: mockUser,
                token: `mock_token_${Date.now()}`
            };

            this.notifyAuthChange();
            return { success: true };
        } catch (error) {
            const message = error instanceof Error ? error.message : "Ошибка авторизации";
            return { success: false, error: message };
        }
    }

    /**
     * Зарегистрироваться
     */
    async register(email: string, _password: string, username?: string): Promise<{ success: boolean; error?: string }> {
        try {
            // TODO: Заменить на реальный запрос к серверу
            // const response = await fetch("/api/auth/register", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ email, password, username })
            // });
            // const data = await response.json();

            // Временная заглушка для разработки
            const mockUser: User = {
                id: `user_${Date.now()}`,
                email,
                username: username || email.split("@")[0]
            };

            this.state = {
                isAuthenticated: true,
                user: mockUser,
                token: `mock_token_${Date.now()}`
            };

            this.notifyAuthChange();
            return { success: true };
        } catch (error) {
            const message = error instanceof Error ? error.message : "Ошибка регистрации";
            return { success: false, error: message };
        }
    }

    /**
     * Выйти
     */
    logout(): void {
        this.state = {
            isAuthenticated: false,
            user: null,
            token: null
        };
        this.notifyAuthChange();
    }

    /**
     * Получить текущего пользователя
     */
    getUser(): User | null {
        return this.state.user;
    }

    /**
     * Получить ID пользователя
     */
    getUserId(): string | null {
        return this.state.user?.id || null;
    }

    /**
     * Получить токен авторизации
     */
    getToken(): string | null {
        return this.state.token;
    }

    /**
     * Проверить, авторизован ли пользователь
     */
    isAuthenticated(): boolean {
        return this.state.isAuthenticated;
    }

    /**
     * Сохранить состояние в localStorage
     */
    private saveToStorage(): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
        } catch (error) {
            console.warn("[AuthManager] Failed to save to storage:", error);
        }
    }

    /**
     * Загрузить состояние из localStorage
     */
    private loadFromStorage(): void {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as AuthState;
                // Проверяем валидность токена (в будущем можно добавить проверку срока действия)
                if (parsed.token && parsed.user) {
                    this.state = parsed;
                }
            }
        } catch (error) {
            console.warn("[AuthManager] Failed to load from storage:", error);
        }
    }

    /**
     * Обновить токен (для refresh token)
     */
    updateToken(token: string): void {
        this.state.token = token;
        this.notifyAuthChange();
    }
}
