package app.rest;

import app.exceptions.ResourceNotFoundException;
import app.models.PageContent;
import app.repositories.PageContentRepository;
import app.repositories.PageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/content")
public class PageContentController {

    @Autowired
    private PageContentRepository pageContentRepository;
    @Autowired
    private PageRepository pageRepository;


// Gets all the content for one page per the Page ID
    @GetMapping("/page/{pageId}/all")
    public ResponseEntity<List<PageContent>> getAllContentByPageId(@PathVariable(value = "pageId") Long pageId) throws ResourceNotFoundException {
        if (!pageRepository.existsById(Math.toIntExact(pageId))) {
            throw new ResourceNotFoundException("Not found Page with id = " + pageId);
        }
        List<PageContent> pageContents = pageContentRepository.findAllByFkPage_PageId(pageId);
        return new ResponseEntity<>(pageContents, HttpStatus.OK);
    }


}
