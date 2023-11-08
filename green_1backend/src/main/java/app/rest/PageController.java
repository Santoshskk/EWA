package app.rest;

import app.models.Page;
import app.repositories.PageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/content")
public class PageController {

    @Autowired
    private PageRepository pageRepository;

    @GetMapping("/all")
    public Iterable<Page> getPages() {
        return pageRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addPage (@RequestParam String pageTitle) {
        Page page = new Page();
        page.setPage_title(pageTitle);
        pageRepository.save(page);
        return ResponseEntity.status(HttpStatus.CREATED).body("Page Created: " + pageTitle);
    }
}
