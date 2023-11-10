package app.models;


import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@DiscriminatorValue("YES_NO")
@Table(name = "yesnoquestion")
@JsonTypeName("yesno")
public class YesNoQuestion extends Question {
    public YesNoQuestion() {

    }
}
