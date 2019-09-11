CREATE TABLE IF NOT EXISTS users (
    userid SERIAL PRIMARY KEY,
    email TEXT,
    password TEXT
);

Insert INTO users (email, password) values ('asshikin@ga.com', '123456');
Insert INTO users (email, password) values ('hilmi@ga.com', '123456');