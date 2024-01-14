package app.models;

import app.repositories.MultipleChoiceOptionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

import static org.springframework.util.ClassUtils.getUserClass;

@Component
public class DataLoader implements CommandLineRunner {

    @Override
    @Transactional
    public void run(String... args) {
        System.out.println("Running CommandLine Startup");
        this.createInitialMultipleChoiceOptions();

        System.out.println("Injected multiplechoice options from " +
                (this.multipleChoiceOptionRepo != null ? getUserClass(this.multipleChoiceOptionRepo.getClass()).getName() : "none"));
    }

    @Autowired
    private MultipleChoiceOptionRepository multipleChoiceOptionRepo;

    private void createInitialMultipleChoiceOptions() {
        // check whether the repo is empty
        List<MultipleChoiceOption> multipleChoiceOptions = this.multipleChoiceOptionRepo.findAll();
        if (multipleChoiceOptions.size() > 0) return;
        System.out.println("Configuring some initial multipleChoiceOptions in the repository");
        multipleChoiceOptions.add(this.multipleChoiceOptionRepo.save(new MultipleChoiceOption((long) 0, "option 1")));
    }
}
