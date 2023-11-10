package app.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "questionsdg")
public class QuestionSDG {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer sdg;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    @JsonBackReference
    private Question question;

    public void setId(Long id) {
        this.id = id;
    }

    public void setSdg(Integer sdg) {
        this.sdg = sdg;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Long getId() {
        return id;
    }

    public Integer getSdg() {
        return sdg;
    }

    public Question getQuestion() {
        return question;
    }
}
