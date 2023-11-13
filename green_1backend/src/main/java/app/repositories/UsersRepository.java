package app.repositories;

import app.models.User;

import java.util.List;

public interface UsersRepository<E> {
    List<E> findAll();

    User findById(int id);
    User save(User user);
    User deleteById(int id);
}
