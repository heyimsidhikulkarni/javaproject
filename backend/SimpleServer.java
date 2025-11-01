import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class SimpleServer {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        
        server.createContext("/api/food-items", new HttpHandler() {
            public void handle(HttpExchange exchange) throws IOException {
                String response = "[{\"id\":1,\"name\":\"Pizza\",\"price\":12.99,\"category\":\"Italian\"}]";
                exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
                exchange.sendResponseHeaders(200, response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
        });
        
        server.createContext("/api/users", new HttpHandler() {
            public void handle(HttpExchange exchange) throws IOException {
                String response = "[{\"id\":1,\"name\":\"John Doe\",\"email\":\"john@example.com\"}]";
                exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
                exchange.sendResponseHeaders(200, response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
        });
        
        server.setExecutor(null);
        server.start();
        System.out.println("Server started on http://localhost:8080");
    }
}