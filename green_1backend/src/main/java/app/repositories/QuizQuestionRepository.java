package app.repositories;

import app.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizQuestionRepository extends JpaRepository<Question, Long> {

}
