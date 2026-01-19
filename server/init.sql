-- Инициализация базы данных для игры
-- Выполнить: psql -U postgres -d game_db -f server/init.sql

-- Создать базу данных (выполнить отдельно, если нужно)
-- CREATE DATABASE game_db;

-- Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Таблица сохранений
CREATE TABLE IF NOT EXISTS saves (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    slot_id VARCHAR(255) NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, slot_id)
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_saves_user_id ON saves(user_id);
CREATE INDEX IF NOT EXISTS idx_saves_slot_id ON saves(user_id, slot_id);
CREATE INDEX IF NOT EXISTS idx_saves_updated_at ON saves(updated_at DESC);

-- Комментарии
COMMENT ON TABLE users IS 'Пользователи игры';
COMMENT ON TABLE saves IS 'Сохранения игр пользователей';
COMMENT ON COLUMN saves.data IS 'JSON данные сохранения (объекты, позиция игрока и т.д.)';
