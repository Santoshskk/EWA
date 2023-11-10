package app.models;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity(name = "YesNoQuestion")
@Table(name = "yesnoquestion")
public class YesNoQuestion extends Question {

    private static final String TYPE = "yesno";
    public YesNoQuestion() {}
    @JsonProperty("type")

    public String getType() {
        return TYPE;
    }
}
