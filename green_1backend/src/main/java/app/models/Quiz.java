package app.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;
@Entity
@Table(name = "quiz")
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String quizName;

    @Column(name = "is_published")
    private boolean isPublished;

    @Column(name = "is_concept")
    private boolean isConcept;
    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Question> quizQuestions;

    public Quiz(){}

    public boolean getIsPublished() {
        return isPublished;
    }

    public boolean getIsConcept() {
        return isConcept;
    }

    public void setIsPublished(boolean isPublished) {
        this.isPublished = isPublished;
    }

    public void setIsConcept(boolean isConcept) {
        this.isConcept = isConcept;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setQuizName(String quizName) {
        this.quizName = quizName;
    }

    public void setQuizQuestions(List<Question> quizQuestions) {
        this.quizQuestions = quizQuestions;
    }

    public Long getId() {
        return id;
    }

    public String getQuizName() {
        return quizName;
    }

    public List<Question> getQuizQuestions() {
        return quizQuestions;
    }
}
