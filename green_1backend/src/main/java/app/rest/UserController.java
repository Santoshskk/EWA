package app.rest;

import app.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import app.repositories.UsersRepository;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UsersRepository<User> usersRepository;

    @GetMapping(path = "test", produces = "application/json")
    public List<User> getTestUser() {
        return List.of(
                new User(1, "John", "Smith"),
                new User(2, "Jan", "Bob"));
    }

    @GetMapping(path = "all", produces = "application/json")
    public List<User> getAllUsers() {
        return usersRepository.findAll();
    }

    @PostMapping(path = "login", produces = "application/json")
    public ResponseEntity<String> login(@RequestBody Map<String, String> userData) {
        String userName = userData.get("userName");
        String passWord = userData.get("passWord");

        try {
            User user = this.usersRepository.findByUserName(userName);

            if (Objects.equals(passWord, user.getPassword())) {
                return ResponseEntity.ok("Login successful!");
            } else if (passWord.trim().isEmpty()) {
                throw new IllegalArgumentException("The password must not be empty!");
            } else {
                throw new IllegalArgumentException("The password is incorrect");
            }
        } catch (IllegalArgumentException illegalArgumentException) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(illegalArgumentException.getMessage());
        } catch (NullPointerException nullPointerException) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("This user does not exist!");
        }
    }
}