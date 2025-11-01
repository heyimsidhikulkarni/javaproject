import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DatabaseServer {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/food_delivery";
    private static final String DB_USER = "Gharse";
    private static final String DB_PASSWORD = "Atharva@2006";
    
    public static void main(String[] args) throws IOException {
        // Test database connection
        testConnection();
        
        HttpServer server = HttpServer.create(new InetSocketAddress(8081), 0);
        
        server.createContext("/api/food-items", exchange -> {
            String response = getFoodItems();
            sendResponse(exchange, response);
        });
        
        server.createContext("/api/users", exchange -> {
            String response = getUsers();
            sendResponse(exchange, response);
        });
        
        server.createContext("/api/orders", exchange -> {
            String response = getOrders();
            sendResponse(exchange, response);
        });
        
        server.setExecutor(null);
        server.start();
        System.out.println("Database-connected API Server started on http://localhost:8081");
    }
    
    private static void testConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            System.out.println("Database connected successfully!");
            conn.close();
        } catch (Exception e) {
            System.out.println("Database connection failed: " + e.getMessage());
            System.out.println("Make sure MySQL is running and database 'food_delivery' exists");
        }
    }
    
    private static String getFoodItems() {
        StringBuilder json = new StringBuilder("[");
        try {
            Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM food_items");
            
            boolean first = true;
            while (rs.next()) {
                if (!first) json.append(",");
                json.append("{")
                    .append("\"id\":").append(rs.getLong("id")).append(",")
                    .append("\"name\":\"").append(rs.getString("name")).append("\",")
                    .append("\"description\":\"").append(rs.getString("description")).append("\",")
                    .append("\"price\":").append(rs.getBigDecimal("price")).append(",")
                    .append("\"category\":\"").append(rs.getString("category")).append("\",")
                    .append("\"imageUrl\":\"").append(rs.getString("image_url")).append("\"")
                    .append("}");
                first = false;
            }
            conn.close();
        } catch (Exception e) {
            System.out.println("Error fetching food items: " + e.getMessage());
        }
        json.append("]");
        return json.toString();
    }
    
    private static String getUsers() {
        StringBuilder json = new StringBuilder("[");
        try {
            Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM users");
            
            boolean first = true;
            while (rs.next()) {
                if (!first) json.append(",");
                json.append("{")
                    .append("\"id\":").append(rs.getLong("id")).append(",")
                    .append("\"name\":\"").append(rs.getString("name")).append("\",")
                    .append("\"email\":\"").append(rs.getString("email")).append("\",")
                    .append("\"phone\":\"").append(rs.getString("phone")).append("\",")
                    .append("\"address\":\"").append(rs.getString("address")).append("\"")
                    .append("}");
                first = false;
            }
            conn.close();
        } catch (Exception e) {
            System.out.println("Error fetching users: " + e.getMessage());
        }
        json.append("]");
        return json.toString();
    }
    
    private static String getOrders() {
        StringBuilder json = new StringBuilder("[");
        try {
            Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT o.*, u.name as user_name FROM orders o JOIN users u ON o.user_id = u.id");
            
            boolean first = true;
            while (rs.next()) {
                if (!first) json.append(",");
                json.append("{")
                    .append("\"id\":").append(rs.getLong("id")).append(",")
                    .append("\"userId\":").append(rs.getLong("user_id")).append(",")
                    .append("\"userName\":\"").append(rs.getString("user_name")).append("\",")
                    .append("\"totalAmount\":").append(rs.getBigDecimal("total_amount")).append(",")
                    .append("\"status\":\"").append(rs.getString("status")).append("\",")
                    .append("\"orderTime\":\"").append(rs.getTimestamp("order_time")).append("\"")
                    .append("}");
                first = false;
            }
            conn.close();
        } catch (Exception e) {
            System.out.println("Error fetching orders: " + e.getMessage());
        }
        json.append("]");
        return json.toString();
    }
    
    private static void sendResponse(HttpExchange exchange, String response) throws IOException {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Content-Type", "application/json");
        exchange.sendResponseHeaders(200, response.getBytes().length);
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
}