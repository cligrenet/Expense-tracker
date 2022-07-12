CREATE DATABASE pernexpense;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(150) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE category AS ENUM ('Bills', 'Business', 'Car', 'Entertainment', 'Food', 'Gifts', 'House', 'Investments', 'Kid','Lottery', 'Medical', 'Other', 'Pet', 'Phone/Internet', 'Rental', 'Salary', 'Saving', 'Shopping', 'Transport', 'Travel');

CREATE TABLE transactions(
    transaction_id SERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES users NOT NULL,
    text VARCHAR(300) NOT NULL,
    amount NUMERIC NOT NULL,
    category category NOT NULL DEFAULT 'Other',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

