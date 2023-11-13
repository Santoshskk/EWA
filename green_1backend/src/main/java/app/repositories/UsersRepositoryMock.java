package app.repositories;

import app.models.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository("USERS.INMEMORY")
public class UsersRepositoryMock implements UsersRepository {
    private List<User> users;

    public UsersRepositoryMock() {
        users = new ArrayList<>();
        int numberOfUsers = 15;

        for (int i = 0; i < numberOfUsers ; i++) {
            users.add(User.createSampleUser());
        }

    }
    @Override
    public List findAll() {
        return users;
    }

    @Override
    public User findById(long id) {
        for (User user : users) {
            if (id == user.getUser_id()) {
                return user;
            }
        }
        return null;
    }

    @Override
    public User deletedById(long id) {
        for (User user : users) {
            if (user.getUser_id() == id) {
                users.remove(user);
                return user;
            }
        }
        return null;
    }

    /**
     * This methode saves of changes user
     * if the id is 0 it will genarate a new one
     * or if the id does not exist it will add that one
     * @param user
     * @return the saved user
     */
    @Override
    public User save(User user) {
        if (user.getUser_id() == 0) {
            int nextId = generateUniqueID();
            user.setUser_id(nextId);
            users.add(user);
        } else {
            for (int i = 0; i < users.size(); i++) {
                if (users.get(i).getUser_id() == user.getUser_id()) {
                    users.set(i, user);
                    return user;
                }
            }
            users.add(user);
            return user;
        }
        return user;
    }

    private int generateUniqueID() {
        int nextId = 1;
        for (User existingUser : users) {
            if (existingUser.getUser_id() >= nextId) {
                nextId = existingUser.getUser_id() + 1;
            }
        }
        return nextId;
    }
}
