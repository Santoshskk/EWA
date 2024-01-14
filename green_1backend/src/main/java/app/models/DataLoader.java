package app.models;

import app.repositories.MultipleChoiceOptionRepository;
import app.repositories.QuizRepository;
import app.repositories.SectorRepository;
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
        this.createInitialSectors();
        this.createInitialQuizzes();

        System.out.println("Injected multiplechoice options from " +
                (this.multipleChoiceOptionRepo != null ? getUserClass(this.multipleChoiceOptionRepo.getClass()).getName() : "none"));
        System.out.println("Injected quizzes from " +
                (this.quizRepo != null ? getUserClass(this.quizRepo.getClass()).getName() : "none"));
        System.out.println("Injected sectors from " +
                (this.sectorRepo != null ? getUserClass(this.sectorRepo.getClass()).getName() : "none"));
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

    @Autowired
    private SectorRepository sectorRepo;

    private void createInitialSectors(){
        List<Sector> sectors = this.sectorRepo.findAll();
        if (sectors.size() > 0) return;
        System.out.println("Configuring some initial sectors in the repository");
        sectors.add(this.sectorRepo.save(new Sector((long) 1, "sector 1", "description 1")));
    }

    @Autowired
    private QuizRepository quizRepo;

    private void createInitialQuizzes(){
        List<Quiz> quizzes = this.quizRepo.findAll();
        if (quizzes.size() > 0) return;
        System.out.println("Configuring some initial quizzes in the repository");
        quizzes.add(this.quizRepo.save(new Quiz((long) 0, "quiz 1", false, true,
                false, sectorRepo.findById((long) 1).orElse(null))));
        quizzes.add(this.quizRepo.save(new Quiz((long) 0, "quiz 2", true, false,
                true, sectorRepo.findById((long) 1).orElse(null))));
    }
}
