package app.repositories;

import app.models.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Repository("USERS.INMEMORY")
public class UsersRepositoryMock implements UsersRepository {
    private List<User> users;

    public UsersRepositoryMock() {
        users = new ArrayList<>();
        int numberOfUsers = 10;

        for (int i = 0; i < numberOfUsers ; i++) {
            users.add(User.createSampleUser());
        }
        users.add(new User("User27", "3927"));

    }
    @Override
    public List findAll() {
        return users;
    }

    @Override
    public User findById(int id) {
        for (User user : users) {
            if (id == user.getUser_id()) {
                return user;
            }
        }
        return null;
    }

    @Override
    public User findByUserName(String userName){
        for (User user : users) {
            if (Objects.equals(userName, user.getUsername())) {
                return user;
            }
        }
        return null;
    }
}
