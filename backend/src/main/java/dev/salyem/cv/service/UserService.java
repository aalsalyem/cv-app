package dev.salyem.cv.service;

import dev.salyem.cv.entity.User;
import dev.salyem.cv.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Value("${app.admin.emails}")
    private String adminEmails;

    @Transactional
    public User findOrCreateUser(String email, String googleId) {
        Optional<User> existingUser = userRepository.findByGoogleId(googleId);

        if (existingUser.isPresent()) {
            return existingUser.get();
        }

        User user = new User();
        user.setEmail(email);
        user.setGoogleId(googleId);
        user.setIsAdmin(isAdminEmail(email));

        return userRepository.save(user);
    }

    public boolean isAdminEmail(String email) {
        List<String> admins = Arrays.asList(adminEmails.split(","));
        return admins.stream()
                .map(String::trim)
                .anyMatch(admin -> admin.equalsIgnoreCase(email));
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
