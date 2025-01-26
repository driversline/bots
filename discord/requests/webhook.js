import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class StyledDiscordWebhook {
    
    private static final String WEBHOOK_URL = "https://discord.com/ . . "; 

    public static void main(String[] args) {
        String serverId = "";
        String title = "";
        String message = "";
        String username = "";
        String avatarUrl = "";

        sendMessage(message, username, avatarUrl, title);
    }

    public static void sendMessage(String message, String username, String avatarUrl, String title) {
        try {
            URL url = new URL(WEBHOOK_URL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setDoOutput(true);

            String jsonPayload = String.format(
                "{\"username\": \"%s\", \"avatar_url\": \"%s\", \"embeds\": [{\"title\": \"%s\", \"description\": \"%s\", \"color\": 16711680}]}",
                username, avatarUrl, title, message
            );

            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = jsonPayload.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            int responseCode = connection.getResponseCode();
            System.out.println("Response Code: " + responseCode);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
