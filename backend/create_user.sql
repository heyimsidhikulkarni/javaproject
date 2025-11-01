-- Create MySQL user and grant privileges
CREATE USER IF NOT EXISTS 'Gharse'@'localhost' IDENTIFIED BY '2006@Sidd';
GRANT ALL PRIVILEGES ON food_delivery.* TO 'Gharse'@'localhost';
FLUSH PRIVILEGES;