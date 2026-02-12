package dev.salyem.cv.controller;

import dev.salyem.cv.entity.User;
import dev.salyem.cv.service.JwtService;
import dev.salyem.cv.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "https://salyem.dev"})
public class AuthController {

    private final JwtService jwtService;
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.ok(Map.of("authenticated", false));
        }

        String token = authHeader.substring(7);

        if (!jwtService.isTokenValid(token)) {
            return ResponseEntity.ok(Map.of("authenticated", false));
        }

        String email = jwtService.extractEmail(token);
        boolean isAdmin = jwtService.extractIsAdmin(token);

        Optional<User> user = userService.findByEmail(email);

        if (user.isEmpty()) {
            return ResponseEntity.ok(Map.of("authenticated", false));
        }

        return ResponseEntity.ok(Map.of(
                "authenticated", true,
                "email", email,
                "isAdmin", isAdmin
        ));
    }
}
