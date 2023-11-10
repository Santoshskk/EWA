package app.rest;

import app.models.Question;
import app.models.QuestionSDG;
import app.repositories.QuestionSDGRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionSDGService {

    private final QuestionSDGRepository questionSDGRepository;

    private final QuestionService questionService;

    @Autowired
    public QuestionSDGService(QuestionSDGRepository questionSDGRepository, QuestionService questionService) {
        this.questionSDGRepository = questionSDGRepository;
        this.questionService = questionService;
    }

    public List<QuestionSDG> getQuestionSDGs() {
        return questionSDGRepository.findAll();
    }

    public QuestionSDG getQuestionSDGById(Long id) {
        return questionSDGRepository.findById(id).orElse(null);
    }

    public QuestionSDG addQuestionSDG(Long questionindex,QuestionSDG questionSDG) {
        Question question = questionService.getQuestionById(questionindex);
        if(question == null){
            throw new RuntimeException("Question not found");
        }
        questionSDG.setQuestion(question);
        questionSDGRepository.save(questionSDG);
        return questionSDG;
    }

    public boolean deleteQuestionSDG(Long id) {
        QuestionSDG questionSDG = questionSDGRepository.findById(id).orElse(null);
        if (questionSDG == null) {
            return false;
        }
        questionSDGRepository.delete(questionSDG);
        return true;
    }
}
