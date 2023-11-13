package app.repositories;

import app.models.User;

import java.util.List;

public interface UsersRepository<E> {
    List<E> findAll();

    User findById(long id);

    User deletedById(long id);

    User save(User user);
    User findByUserName(String userName);

}
