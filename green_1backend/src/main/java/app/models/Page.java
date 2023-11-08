package app.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Page {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int page_id;
    private String page_title;

    public Page(int page_id, String page_title) {
        this.page_id = page_id;
        this.page_title = page_title;
    }

    public Page() {

    }

    public int getPage_id() {
        return page_id;
    }

    public void setPage_id(int page_id) {
        this.page_id = page_id;
    }

    public String getPage_title() {
        return page_title;
    }

    public void setPage_title(String page_title) {
        this.page_title = page_title;
    }
}
