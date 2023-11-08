package app.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Page {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int pageId;
    private String pageTitle;

    public Page(int pageId, String pageTitle) {
        this.pageId = pageId;
        this.pageTitle = pageTitle;
    }

    public Page() {

    }

    public int getPageId() {
        return pageId;
    }

    public void setPageId(int page_id) {
        this.pageId = page_id;
    }

    public String getPageTitle() {
        return pageTitle;
    }

    public void setPageTitle(String page_title) {
        this.pageTitle = page_title;
    }
}
