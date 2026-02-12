package dev.salyem.cv.config;

import dev.salyem.cv.entity.User;
import dev.salyem.cv.service.JwtService;
import dev.salyem.cv.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserService userService;

    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String googleId = oAuth2User.getAttribute("sub");

        User user = userService.findOrCreateUser(email, googleId);
        String token = jwtService.generateToken(email, user.getIsAdmin());

        String frontendUrl = allowedOrigins.split(",")[0];
        String redirectUrl = frontendUrl + "/console?token=" + token;

        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}
