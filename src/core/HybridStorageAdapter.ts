/**
 * HybridStorageAdapter - Гибридный адаптер для сохранений
 * 
 * Сохраняет данные одновременно:
 * 1. Локально (IndexedDB/localStorage) - для быстрого доступа
 * 2. На сервере (если пользователь авторизован) - для синхронизации
 * 
 * При загрузке:
 * - Сначала пытается загрузить с сервера (если авторизован)
 * - Если не получается, загружает из локального хранилища
 * - При успешной загрузке с сервера синхронизирует локальное хранилище
 */
import { StorageAdapter, LocalStorageAdapter, IndexedDBAdapter, ServerAdapter } from "./StorageAdapter";
import { GameSaveData } from "./SaveSerializer";
import { AuthManager } from "./AuthManager";

export class HybridStorageAdapter implements StorageAdapter {
    private localStorage: StorageAdapter;
    private serverStorage: StorageAdapter | null = null;
    private authManager: AuthManager;

    constructor(authManager: AuthManager, apiUrl?: string) {
        // Локальное хранилище (всегда доступно)
        if (typeof indexedDB !== "undefined") {
            this.localStorage = new IndexedDBAdapter();
        } else {
            this.localStorage = new LocalStorageAdapter();
        }

        this.authManager = authManager;

        // Серверное хранилище (только если указан API URL)
        if (apiUrl) {
            this.serverStorage = new ServerAdapter(
                apiUrl,
                authManager.getUserId(),
                () => authManager.getToken()
            );

            // Обновляем серверный адаптер при изменении авторизации
            authManager.onAuthChange(() => {
                if (apiUrl) {
                    this.serverStorage = new ServerAdapter(
                        apiUrl,
                        authManager.getUserId(),
                        () => authManager.getToken()
                    );
                }
            });
        }
    }

    async save(key: string, data: GameSaveData): Promise<void> {
        // Всегда сохраняем локально
        await this.localStorage.save(key, data);

        // Если авторизован и есть сервер - сохраняем и на сервер
        if (this.authManager.isAuthenticated() && this.serverStorage) {
            try {
                await this.serverStorage.save(key, data);
                console.log(`[HybridStorage] Saved to server: ${key}`);
            } catch (error) {
                console.warn(`[HybridStorage] Server save failed, but local save succeeded:`, error);
                // Не бросаем ошибку - локальное сохранение успешно
            }
        }
    }

    async load(key: string): Promise<GameSaveData | null> {
        // Если авторизован - сначала пытаемся загрузить с сервера
        if (this.authManager.isAuthenticated() && this.serverStorage) {
            try {
                const serverData = await this.serverStorage.load(key);
                if (serverData) {
                    // Синхронизируем локальное хранилище с серверными данными
                    await this.localStorage.save(key, serverData);
                    console.log(`[HybridStorage] Loaded from server and synced locally: ${key}`);
                    return serverData;
                }
            } catch (error) {
                console.warn(`[HybridStorage] Server load failed, trying local:`, error);
            }
        }

        // Загружаем из локального хранилища
        const localData = await this.localStorage.load(key);
        if (localData) {
            console.log(`[HybridStorage] Loaded from local storage: ${key}`);
            
            // Если авторизован - пытаемся синхронизировать с сервером (в фоне)
            if (this.authManager.isAuthenticated() && this.serverStorage) {
                this.serverStorage.save(key, localData).catch(err => {
                    console.warn(`[HybridStorage] Background sync to server failed:`, err);
                });
            }
        }

        return localData;
    }

    async delete(key: string): Promise<void> {
        // Удаляем локально
        await this.localStorage.delete(key);

        // Удаляем на сервере (если авторизован)
        if (this.authManager.isAuthenticated() && this.serverStorage) {
            try {
                await this.serverStorage.delete(key);
            } catch (error) {
                console.warn(`[HybridStorage] Server delete failed:`, error);
            }
        }
    }

    async listKeys(): Promise<string[]> {
        // Если авторизован - получаем список с сервера
        if (this.authManager.isAuthenticated() && this.serverStorage) {
            try {
                const serverKeys = await this.serverStorage.listKeys();
                const localKeys = await this.localStorage.listKeys();
                
                // Объединяем и убираем дубликаты
                const allKeys = new Set([...serverKeys, ...localKeys]);
                return Array.from(allKeys);
            } catch (error) {
                console.warn(`[HybridStorage] Server list failed, using local:`, error);
            }
        }

        // Возвращаем локальные ключи
        return await this.localStorage.listKeys();
    }

    async exists(key: string): Promise<boolean> {
        // Проверяем локально
        const localExists = await this.localStorage.exists(key);
        if (localExists) return true;

        // Проверяем на сервере (если авторизован)
        if (this.authManager.isAuthenticated() && this.serverStorage) {
            try {
                return await this.serverStorage.exists(key);
            } catch (error) {
                return false;
            }
        }

        return false;
    }
}
