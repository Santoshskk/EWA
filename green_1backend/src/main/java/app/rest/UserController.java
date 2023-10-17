package app.rest;

import app.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import app.repositories.UsersRepository;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UsersRepository<User> usersRepository;

    @GetMapping( path = "test", produces = "application/json")
    public List<User> getTestUser(){
        return List.of(
                new User(1,"John", "Smith"),
                new User(2,"Jan","Bob"));
    }

    @GetMapping(path = "all", produces = "application/json")
    public List<User> getAllUsers(){
        return usersRepository.findAll();
    }
}
