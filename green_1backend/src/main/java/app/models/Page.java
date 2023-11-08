package app.models;

public class Page {
    private int page_id;
    private int page_title;

    public Page(int page_id, int page_title) {
        this.page_id = page_id;
        this.page_title = page_title;
    }

    public int getPage_id() {
        return page_id;
    }

    public void setPage_id(int page_id) {
        this.page_id = page_id;
    }

    public int getPage_title() {
        return page_title;
    }

    public void setPage_title(int page_title) {
        this.page_title = page_title;
    }
}
