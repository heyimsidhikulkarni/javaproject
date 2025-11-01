import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.sql.*;

public class SimpleDatabaseServer {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/food_delivery?useSSL=false&allowPublicKeyRetrieval=true";
    private static final String DB_USER = "Gharse";
    private static final String DB_PASSWORD = "Atharva@2006";
    
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8082), 0);
        
        server.createContext("/api/food-items", exchange -> {
            String response = getFoodItems();
            sendResponse(exchange, response);
        });
        
        server.createContext("/api/users", exchange -> {
            String response = getUsers();
            sendResponse(exchange, response);
        });
        
        server.setExecutor(null);
        server.start();
        System.out.println("Server started on http://localhost:8082");
        System.out.println("Testing database connection...");
        testConnection();
    }
    
    private static void testConnection() {
        try {
            Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            System.out.println("✓ Database connected successfully!");
            conn.close();
        } catch (Exception e) {
            System.out.println("✗ Database connection failed: " + e.getMessage());
            System.out.println("Make sure MySQL is running and 'food_delivery' database exists");
        }
    }
    
    private static String getFoodItems() {
        try {
            Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM food_items");
            
            StringBuilder json = new StringBuilder("[");
            boolean first = true;
            while (rs.next()) {
                if (!first) json.append(",");
                json.append("{")
                    .append("\"id\":").append(rs.getLong("id")).append(",")
                    .append("\"name\":\"").append(rs.getString("name")).append("\",")
                    .append("\"description\":\"").append(rs.getString("description")).append("\",")
                    .append("\"price\":").append(rs.getBigDecimal("price")).append(",")
                    .append("\"category\":\"").append(rs.getString("category")).append("\"")
                    .append("}");
                first = false;
            }
            json.append("]");
            conn.close();
            return json.toString();
        } catch (Exception e) {
            return "[{\"error\":\"" + e.getMessage() + "\"}]";
        }
    }
    
    private static String getUsers() {
        try {
            Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM users");
            
            StringBuilder json = new StringBuilder("[");
            boolean first = true;
            while (rs.next()) {
                if (!first) json.append(",");
                json.append("{")
                    .append("\"id\":").append(rs.getLong("id")).append(",")
                    .append("\"name\":\"").append(rs.getString("name")).append("\",")
                    .append("\"email\":\"").append(rs.getString("email")).append("\"")
                    .append("}");
                first = false;
            }
            json.append("]");
            conn.close();
            return json.toString();
        } catch (Exception e) {
            return "[{\"error\":\"" + e.getMessage() + "\"}]";
        }
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