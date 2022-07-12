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

CREATE TYPE category AS ENUM ('Bills', 'Business', 'Bank Fees', 'Car', 'Education/Training', 'Entertainment', 'Food/Grocery', 'Gifts', 'House', 'Investments', 'Interest', 'Insurance', 'Kid', 'Legal Fees', 'Medical', 'Online Services', 'Other', 'Pet', 'Phone/Internet', 'Post/Shipping', 'Rental', 'Repairs/Maintenance', 'Restaurant', 'Salary', 'Saving', 'Software', 'Shopping', 'Subscriptions/Memberships', 'Taxes', 'Transport', 'Travel');

CREATE TABLE transactions(
    transaction_id SERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES users NOT NULL,
    text VARCHAR(300) NOT NULL,
    amount NUMERIC NOT NULL,
    category category NOT NULL DEFAULT 'Other',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

