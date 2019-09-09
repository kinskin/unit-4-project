CREATE TABLE IF NOT EXISTS users (
    userid SERIAL PRIMARY KEY,
    email TEXT,
    password TEXT
);