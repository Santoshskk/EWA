package app.rest;

import app.models.Question;
import app.models.Quiz;
import app.repositories.QuizQuestionRepository;
import app.repositories.QuizRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/question")
public class QuestionController {
    private final QuizQuestionRepository quizQuestionRepository;

    @Autowired
    public QuestionController(QuizQuestionRepository quizQuestionRepository) {
        this.quizQuestionRepository = quizQuestionRepository;
    }

    // Get all quizzes
    @GetMapping
    @Transactional
    public List<Question> getAllQuizzes() {
        return quizQuestionRepository.findAll();
    }
}
