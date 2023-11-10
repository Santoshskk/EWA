package app.rest;

import app.models.QuestionSDG;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questionsdg")
public class QuestionSDGController {

    private final QuestionSDGService questionSDGService;

    @Autowired
    public QuestionSDGController(QuestionSDGService questionSDGService) {
        this.questionSDGService = questionSDGService;
    }

    @GetMapping
    public List<QuestionSDG> getQuestionSDGs() {
        return questionSDGService.getQuestionSDGs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getQuestionSDGById(@PathVariable Long id) {
        QuestionSDG questionSDG = questionSDGService.getQuestionSDGById(id);
        if (questionSDG == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(questionSDG);

    }

    @PostMapping("/create/{questionindex}")
    public ResponseEntity<Object> addQuestionSDG(@PathVariable Long questionindex ,@RequestBody QuestionSDG questionSDG) {
        return ResponseEntity.status(201).body(questionSDGService.addQuestionSDG(questionindex,questionSDG));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteQuestionSDG(@PathVariable Long id) {
        boolean success = questionSDGService.deleteQuestionSDG(id);
        if (!success) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }


}
