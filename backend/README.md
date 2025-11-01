# Food Delivery Backend

Spring Boot backend for the Home Food Delivery Website.

## Setup Instructions

### 1. Database Setup
1. Open MySQL Workbench
2. Create a new connection (if not exists)
3. Run the `database_setup.sql` script to create the database and sample data

### 2. Configuration
Update `src/main/resources/application.properties` with your MySQL credentials:
- Change `spring.datasource.username` to your MySQL username
- Change `spring.datasource.password` to your MySQL password

### 3. Running the Application
```bash
.\gradlew.bat bootRun
```

The API will be available at `http://localhost:8080`

## API Endpoints

### Food Items
- GET `/api/food-items` - Get all food items
- GET `/api/food-items/category/{category}` - Get food items by category
- POST `/api/food-items` - Create new food item

### Users
- GET `/api/users` - Get all users
- POST `/api/users` - Create new user
- GET `/api/users/email/{email}` - Get user by email

### Orders
- GET `/api/orders` - Get all orders
- POST `/api/orders` - Create new order
- GET `/api/orders/user/{userId}` - Get orders by user ID