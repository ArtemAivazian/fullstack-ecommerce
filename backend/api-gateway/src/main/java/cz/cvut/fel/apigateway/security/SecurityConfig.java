package cz.cvut.fel.apigateway.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.csrf.WebSessionServerCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import static org.springframework.security.config.Customizer.withDefaults;

/**
 * Security configuration for the API Gateway, enabling WebFlux security and OAuth2 support.
 *
 * This class configures security settings such as authentication, OAuth2 login,
 * and JWT token handling for resource server requests. CSRF protection is enabled
 * and the token is stored in web session attributes and headers instead of cookies.
 */
@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    /**
     * Configures the security filter chain for the application.
     *
     * - Any exchange requires authentication.
     * - OAuth2 login is enabled with default settings.
     * - The resource server is configured to use JWT tokens for authorization.
     * - CSRF protection is enabled using WebSessionServerCsrfTokenRepository.
     *
     * @param http the {@link ServerHttpSecurity} object to configure security settings.
     * @return the configured {@link SecurityWebFilterChain} object.
     */
    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http.authorizeExchange(auth -> auth.anyExchange().authenticated())
                .oauth2Login(withDefaults())
                .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()));

        // Enable CSRF protection using WebSessionServerCsrfTokenRepository
        http.csrf(csrf -> csrf
                .csrfTokenRepository(new WebSessionServerCsrfTokenRepository())
        );
        return http.build();
    }

    /**
     * Configures CORS settings to allow requests from any origin.
     *
     * @return the configured {@link CorsWebFilter} object.
     */
    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();
        corsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);

        return new CorsWebFilter(corsConfigurationSource);
    }
}
