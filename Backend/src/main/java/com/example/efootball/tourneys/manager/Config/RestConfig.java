package com.example.efootball.tourneys.manager.Config;

import com.example.efootball.tourneys.manager.Entities.Player;
import com.example.efootball.tourneys.manager.Entities.Registration;
import com.example.efootball.tourneys.manager.Entities.Team;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class RestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        // This enables CORS for all Spring Data REST repositories
        cors.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");

        // show the IDs for React app to use.
        config.exposeIdsFor(Team.class, Player.class, Registration.class);
    }
}