package app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Green1backendApplication {

    public static void main(String[] args) {
        SpringApplication.run(Green1backendApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:8080")
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders(HttpHeaders.AUTHORIZATION,
                                HttpHeaders.CONTENT_TYPE)
                        .exposedHeaders(HttpHeaders.AUTHORIZATION,
                                HttpHeaders.CONTENT_TYPE)
                        .allowCredentials(true);
            }
        };
    }
}
