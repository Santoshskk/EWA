package app.repositories;

import app.models.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findAll();
    Quiz findById(int id);

    Quiz save(Quiz quiz);

    void delete(Quiz quiz);
}
