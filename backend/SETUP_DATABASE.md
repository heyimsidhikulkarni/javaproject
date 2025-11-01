# Database Setup Guide

## Step 1: Setup MySQL Database
1. Open MySQL Workbench
2. Connect to your MySQL server
3. Run the `database_setup.sql` script to create database and tables

## Step 2: Update Database Credentials
Edit `DatabaseServer.java` and update these lines with your MySQL credentials:
```java
private static final String DB_USER = "root";           // Your MySQL username
private static final String DB_PASSWORD = "password";   // Your MySQL password
```

## Step 3: Run the Server
```bash
javac -cp "mysql-connector-java-8.0.33.jar;." DatabaseServer.java
java -cp "mysql-connector-java-8.0.33.jar;." DatabaseServer
```

## Step 4: Test the API
- Food Items: http://localhost:8081/api/food-items
- Users: http://localhost:8081/api/users  
- Orders: http://localhost:8081/api/orders