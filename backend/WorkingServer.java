import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class WorkingServer {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8083), 0);
        
        server.createContext("/api/food-items", exchange -> {
            String response = """
                [
                    {"id":1,"name":"Margherita Pizza","description":"Classic pizza with tomato sauce and mozzarella","price":12.99,"category":"Pizza"},
                    {"id":2,"name":"Chicken Burger","description":"Grilled chicken burger with lettuce and tomato","price":8.99,"category":"Burger"},
                    {"id":3,"name":"Caesar Salad","description":"Fresh romaine lettuce with caesar dressing","price":7.99,"category":"Salad"},
                    {"id":4,"name":"Pasta Carbonara","description":"Creamy pasta with bacon and parmesan","price":11.99,"category":"Pasta"}
                ]
                """;
            sendResponse(exchange, response);
        });
        
        server.createContext("/api/users", exchange -> {
            String response = """
                [
                    {"id":1,"name":"John Doe","email":"john@example.com","phone":"1234567890","address":"123 Main St"},
                    {"id":2,"name":"Jane Smith","email":"jane@example.com","phone":"0987654321","address":"456 Oak Ave"}
                ]
                """;
            sendResponse(exchange, response);
        });
        
        server.createContext("/api/orders", exchange -> {
            String response = """
                [
                    {"id":1,"userId":1,"userName":"John Doe","totalAmount":25.98,"status":"DELIVERED","orderTime":"2024-01-15T10:30:00"},
                    {"id":2,"userId":2,"userName":"Jane Smith","totalAmount":12.99,"status":"PENDING","orderTime":"2024-01-15T11:00:00"}
                ]
                """;
            sendResponse(exchange, response);
        });
        
        server.setExecutor(null);
        server.start();
        System.out.println("✓ Food Delivery API Server started successfully!");
        System.out.println("✓ Server running on: http://localhost:8083");
        System.out.println("✓ Available endpoints:");
        System.out.println("  - GET http://localhost:8083/api/food-items");
        System.out.println("  - GET http://localhost:8083/api/users");
        System.out.println("  - GET http://localhost:8083/api/orders");
        System.out.println("✓ Ready to connect with your React frontend!");
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