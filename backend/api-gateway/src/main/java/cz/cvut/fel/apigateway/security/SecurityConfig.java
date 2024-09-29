package cz.cvut.fel.apigateway.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.server.ServerWebExchange;

import static org.springframework.security.config.Customizer.withDefaults;

/**
 * Security configuration for the API Gateway, enabling WebFlux security and OAuth2 support.
 *
 * This class configures security settings such as authentication, OAuth2 login,
 * and JWT token handling for resource server requests. CSRF protection is disabled
 */
@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    /**
     * Configures the security filter chain for the application.
     * <p>
     * - Any exchange requires authentication.
     * - OAuth2 login is enabled with default settings.
     * - The resource server is configured to use JWT tokens for authorization.
     * - CSRF protection is disabled for simplicity.
     *
     * @param http the {@link ServerHttpSecurity} object to configure security settings.
     * @return the configured {@link SecurityWebFilterChain} object.
     */
    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
                .cors(corsCustomizer -> corsCustomizer.configurationSource(exchange -> {
                    CorsConfiguration corsConfig = new CorsConfiguration();
                    corsConfig.addAllowedOrigin("http://localhost:3000"); // Frontend origin
                    corsConfig.addAllowedMethod("*"); // Allow all HTTP methods (GET, POST, PUT, DELETE, OPTIONS)
                    corsConfig.addAllowedHeader("*"); // Allow all headers
                    corsConfig.setAllowCredentials(true); // Allow credentials such as cookies
                    corsConfig.setMaxAge(3600L);
                    return corsConfig;
                }))
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(exchange -> exchange
                        // Permit all OPTIONS requests (CORS preflight)
//                        .pathMatchers("OPTIONS", "/**").permitAll()
                        .anyExchange().authenticated()) // All other requests require authentication
                .oauth2Login(withDefaults())
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));

        return http.build();
    }
}

