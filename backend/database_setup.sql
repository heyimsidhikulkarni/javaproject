-- Create database
CREATE DATABASE IF NOT EXISTS food_delivery;
USE food_delivery;

-- Create tables
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT
);

CREATE TABLE IF NOT EXISTS food_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    image_url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Sample data for food items
INSERT INTO food_items (name, description, price, category, image_url) VALUES
('Margherita Pizza', 'Classic pizza with tomato sauce and mozzarella', 12.99, 'Pizza', 'pizza1.jpg'),
('Chicken Burger', 'Grilled chicken burger with lettuce and tomato', 8.99, 'Burger', 'burger1.jpg'),
('Caesar Salad', 'Fresh romaine lettuce with caesar dressing', 7.99, 'Salad', 'salad1.jpg'),
('Pasta Carbonara', 'Creamy pasta with bacon and parmesan', 11.99, 'Pasta', 'pasta1.jpg');

-- Sample user data
INSERT INTO users (name, email, phone, address) VALUES
('John Doe', 'john@example.com', '1234567890', '123 Main St, City'),
('Jane Smith', 'jane@example.com', '0987654321', '456 Oak Ave, Town');

-- Sample orders data
INSERT INTO orders (user_id, total_amount, status) VALUES
(1, 25.98, 'DELIVERED'),
(2, 12.99, 'PENDING'),
(1, 19.98, 'PREPARING');