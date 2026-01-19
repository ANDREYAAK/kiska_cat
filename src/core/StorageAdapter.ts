/**
 * StorageAdapter - Абстракция для хранения данных
 * 
 * Поддерживает разные типы хранилищ:
 * - localStorage (для небольших данных)
 * - IndexedDB (для больших объёмов)
 * - Server API (для синхронизации между устройствами)
 */
import { GameSaveData } from "./SaveSerializer";

export interface StorageAdapter {
    /**
     * Сохранить данные по ключу
     */
    save(key: string, data: GameSaveData): Promise<void>;

    /**
     * Загрузить данные по ключу
     */
    load(key: string): Promise<GameSaveData | null>;

    /**
     * Удалить данные по ключу
     */
    delete(key: string): Promise<void>;

    /**
     * Получить список всех ключей сохранений
     */
    listKeys(): Promise<string[]>;

    /**
     * Проверить, существует ли сохранение
     */
    exists(key: string): Promise<boolean>;
}

/**
 * Адаптер для localStorage (подходит для небольших сохранений)
 */
export class LocalStorageAdapter implements StorageAdapter {
    private readonly prefix: string;

    constructor(prefix: string = "game_save_") {
        this.prefix = prefix;
    }

    private getKey(key: string): string {
        return `${this.prefix}${key}`;
    }

    async save(key: string, data: GameSaveData): Promise<void> {
        try {
            const storageKey = this.getKey(key);
            const json = JSON.stringify(data);
            
            // Проверяем размер (localStorage обычно ограничен ~5-10MB)
            if (json.length > 5 * 1024 * 1024) {
                throw new Error("Save data too large for localStorage");
            }
            
            localStorage.setItem(storageKey, json);
        } catch (error) {
            console.error("[LocalStorageAdapter] Save failed:", error);
            throw error;
        }
    }

    async load(key: string): Promise<GameSaveData | null> {
        try {
            const storageKey = this.getKey(key);
            const json = localStorage.getItem(storageKey);
            
            if (!json) return null;
            
            const data = JSON.parse(json) as GameSaveData;
            return data;
        } catch (error) {
            console.error("[LocalStorageAdapter] Load failed:", error);
            return null;
        }
    }

    async delete(key: string): Promise<void> {
        try {
            const storageKey = this.getKey(key);
            localStorage.removeItem(storageKey);
        } catch (error) {
            console.error("[LocalStorageAdapter] Delete failed:", error);
            throw error;
        }
    }

    async listKeys(): Promise<string[]> {
        try {
            const keys: string[] = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(this.prefix)) {
                    const saveKey = key.substring(this.prefix.length);
                    keys.push(saveKey);
                }
            }
            return keys;
        } catch (error) {
            console.error("[LocalStorageAdapter] List keys failed:", error);
            return [];
        }
    }

    async exists(key: string): Promise<boolean> {
        const storageKey = this.getKey(key);
        return localStorage.getItem(storageKey) !== null;
    }
}

/**
 * Адаптер для серверного API (PostgreSQL через REST API)
 * Используется для синхронизации между устройствами
 */
export class ServerAdapter implements StorageAdapter {
    private readonly apiUrl: string;
    private readonly userId: string | null;
    private readonly getToken: () => string | null;

    constructor(apiUrl: string, userId: string | null, getToken: () => string | null = () => null) {
        this.apiUrl = apiUrl;
        this.userId = userId;
        this.getToken = getToken;
    }

    private getEndpoint(key: string): string {
        if (!this.userId) {
            throw new Error("Cannot create endpoint: user not authenticated");
        }
        return `${this.apiUrl}/${this.userId}/saves/${key}`;
    }

    async save(key: string, data: GameSaveData): Promise<void> {
        if (!this.userId) {
            throw new Error("Cannot save to server: user not authenticated");
        }

        try {
            const token = this.getToken();
            const headers: HeadersInit = {
                "Content-Type": "application/json",
            };
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const response = await fetch(this.getEndpoint(key), {
                method: "PUT",
                headers,
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Server save failed: ${response.statusText}`);
            }
        } catch (error) {
            console.error("[ServerAdapter] Save failed:", error);
            throw error;
        }
    }

    async load(key: string): Promise<GameSaveData | null> {
        if (!this.userId) {
            return null; // Не авторизован - не можем загрузить с сервера
        }

        try {
            const token = this.getToken();
            const headers: HeadersInit = {
                "Content-Type": "application/json",
            };
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const response = await fetch(this.getEndpoint(key), {
                method: "GET",
                headers,
            });

            if (response.status === 404) {
                return null;
            }

            if (!response.ok) {
                throw new Error(`Server load failed: ${response.statusText}`);
            }

            const data = await response.json() as GameSaveData;
            return data;
        } catch (error) {
            console.error("[ServerAdapter] Load failed:", error);
            return null;
        }
    }

    async delete(key: string): Promise<void> {
        try {
            const response = await fetch(this.getEndpoint(key), {
                method: "DELETE",
            });

            if (!response.ok && response.status !== 404) {
                throw new Error(`Server delete failed: ${response.statusText}`);
            }
        } catch (error) {
            console.error("[ServerAdapter] Delete failed:", error);
            throw error;
        }
    }

    async listKeys(): Promise<string[]> {
        if (!this.userId) {
            return [];
        }

        try {
            const token = this.getToken();
            const headers: HeadersInit = {
                "Content-Type": "application/json",
            };
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const response = await fetch(`${this.apiUrl}/${this.userId}/saves`, {
                method: "GET",
                headers,
            });

            if (!response.ok) {
                throw new Error(`Server list failed: ${response.statusText}`);
            }

            const data = await response.json() as { keys: string[] };
            return data.keys || [];
        } catch (error) {
            console.error("[ServerAdapter] List keys failed:", error);
            return [];
        }
    }

    async exists(key: string): Promise<boolean> {
        const data = await this.load(key);
        return data !== null;
    }
}

/**
 * Адаптер для IndexedDB (подходит для больших объёмов данных)
 */
export class IndexedDBAdapter implements StorageAdapter {
    private readonly dbName: string = "game_saves";
    private readonly storeName: string = "saves";
    private db: IDBDatabase | null = null;

    private async getDB(): Promise<IDBDatabase> {
        if (this.db) return this.db;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName);
                }
            };
        });
    }

    async save(key: string, data: GameSaveData): Promise<void> {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.storeName], "readwrite");
            const store = transaction.objectStore(this.storeName);
            const request = store.put(data, key);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }

    async load(key: string): Promise<GameSaveData | null> {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.storeName], "readonly");
            const store = transaction.objectStore(this.storeName);
            const request = store.get(key);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                const data = request.result as GameSaveData | undefined;
                resolve(data || null);
            };
        });
    }

    async delete(key: string): Promise<void> {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.storeName], "readwrite");
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(key);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }

    async listKeys(): Promise<string[]> {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.storeName], "readonly");
            const store = transaction.objectStore(this.storeName);
            const request = store.getAllKeys();

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                const keys = request.result as string[];
                resolve(keys);
            };
        });
    }

    async exists(key: string): Promise<boolean> {
        const data = await this.load(key);
        return data !== null;
    }
}
