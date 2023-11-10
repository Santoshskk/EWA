package app.repositories;

import app.models.Question;
import app.models.QuestionSDG;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionSDGRepository extends JpaRepository<QuestionSDG, Long> {
}
