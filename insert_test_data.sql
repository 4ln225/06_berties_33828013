# Insert data into the tables

USE berties_books;

-- Add example book
INSERT INTO books (name, price) VALUES ('Brighton Rock', 12.99);

-- Add required GOLD user for marking
INSERT INTO users (first, last, username, email, password)
VALUES ('Gold', 'User', 'gold', 'gold@example.com', '$2b$10$LxrZzLUss3jUl4mRgA1NK.YlLG5cENFHDbdH.wZmmk4bxwMwdk6PO');
