package app.rest;

import app.repositories.MultipleChoiceQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class MultipleChoiceQuestionService {

    private final MultipleChoiceQuestionRepository multipleChoiceQuestionRepository;

    @Autowired
    public MultipleChoiceQuestionService(MultipleChoiceQuestionRepository multipleChoiceQuestionRepository) {
        this.multipleChoiceQuestionRepository = multipleChoiceQuestionRepository;
    }
}
