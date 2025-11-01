import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class FoodDeliveryServer {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8081), 0);
        
        // Food items endpoint
        server.createContext("/api/food-items", exchange -> {
            String response = """
                [
                    {"id":1,"name":"Margherita Pizza","description":"Classic pizza with tomato sauce and mozzarella","price":12.99,"category":"Pizza","imageUrl":"pizza1.jpg"},
                    {"id":2,"name":"Chicken Burger","description":"Grilled chicken burger with lettuce and tomato","price":8.99,"category":"Burger","imageUrl":"burger1.jpg"},
                    {"id":3,"name":"Caesar Salad","description":"Fresh romaine lettuce with caesar dressing","price":7.99,"category":"Salad","imageUrl":"salad1.jpg"},
                    {"id":4,"name":"Pasta Carbonara","description":"Creamy pasta with bacon and parmesan","price":11.99,"category":"Pasta","imageUrl":"pasta1.jpg"}
                ]
                """;
            sendResponse(exchange, response);
        });
        
        // Users endpoint
        server.createContext("/api/users", exchange -> {
            String response = """
                [
                    {"id":1,"name":"John Doe","email":"john@example.com","phone":"1234567890","address":"123 Main St, City"},
                    {"id":2,"name":"Jane Smith","email":"jane@example.com","phone":"0987654321","address":"456 Oak Ave, Town"}
                ]
                """;
            sendResponse(exchange, response);
        });
        
        // Orders endpoint
        server.createContext("/api/orders", exchange -> {
            String response = """
                [
                    {"id":1,"userId":1,"totalAmount":25.98,"status":"DELIVERED","orderTime":"2024-01-15T10:30:00"},
                    {"id":2,"userId":2,"totalAmount":12.99,"status":"PENDING","orderTime":"2024-01-15T11:00:00"}
                ]
                """;
            sendResponse(exchange, response);
        });
        
        server.setExecutor(null);
        server.start();
        System.out.println("Food Delivery API Server started on http://localhost:8081");
        System.out.println("Available endpoints:");
        System.out.println("- GET http://localhost:8081/api/food-items");
        System.out.println("- GET http://localhost:8081/api/users");
        System.out.println("- GET http://localhost:8081/api/orders");
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