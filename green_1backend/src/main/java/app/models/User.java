package app.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.util.Random;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long user_id = 0L;
    private int sector_id;
    private String first_name;
    private String last_name;
    private String email;
    private int security_clearance;
    private String password;
    private String username;
    private String bio;
    private String occupation;
    private LocalDate date_of_birth;
    private String postalcode;
    private String user_goal;

    private boolean isAdmin = false;

    private static final String[] FIRST_NAMES = {"John", "Mary", "David", "Lisa", "Michael", "Sarah"};
    private static final String[] LAST_NAMES = {"Smith", "Johnson", "Brown", "Taylor", "Clark", "Wilson"};
    private static final String[] EMAIL_USER = {"Smith@gmail.com", "Johnson@hotmail.com", "Brownlee@live.com", "TaylorA@gmail.com", "Clark123@gmail.com", "Wilsonbaba@gmail.com"};
    private static final String[] USER_PASSWORD = {"R#9sGp@2", "3Fb*Zx7Y", "Qa2$8pVr", "D6&hFt1s", "Px9!cL5w"};
    private static final String[] USER_NAMES = {"Johny123", "Mary123", "David123", "Lisa123", "Michael123", "Sarah123"};
    private static final String[] USER_GOALS = {"No Poverty",
            "Zero Hunger",
            "Good Health and Well Being",
            "Quality Education",
            "Gender Equality", "Clean Water and Sanitation",
            "Affordable and Clean Energy", "Decent Work and Economic Growth",
            "Industry, Innovation, and Infrastructure",
            "Reduced Inequality", "Sustainable Cities and Communities",
            "Responsible Consumption and Production", "Climate Action",
            "Life Below Water", "Life on Land",
            "Peace, Justice, and Strong Institutions",
            "Partnerships for the Goals"};

    public User(long user_id, String first_name, String last_name, String email, String username, String user_goal, String password, boolean isAdmin) {
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.username = username;
        this.user_goal = user_goal;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    public User() {
    }

    public static User createSampleUser() {
        Random random = new Random();
        return new User(random.nextLong(1000),
                FIRST_NAMES[random.nextInt(FIRST_NAMES.length)],
                LAST_NAMES[random.nextInt(LAST_NAMES.length)],
                EMAIL_USER[random.nextInt(EMAIL_USER.length)],
                USER_NAMES[random.nextInt(USER_NAMES.length)],
                USER_GOALS[random.nextInt(USER_GOALS.length)],
                USER_PASSWORD[random.nextInt(USER_PASSWORD.length)],
                false
        );
    }

    public User(long user_id, int sector_id, String first_name, String last_name, String email, int security_clearance, String password, String username, String bio, String occupation, LocalDate date_of_birth, String postalcode, String user_goal, boolean isAdmin) {
        this.user_id = user_id;
        this.sector_id = sector_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.security_clearance = security_clearance;
        this.password = password;
        this.username = username;
        this.bio = bio;
        this.occupation = occupation;
        this.date_of_birth = date_of_birth;
        this.postalcode = postalcode;
        this.user_goal = user_goal;
        this.isAdmin = isAdmin;
    }

    public User(String username, String password, boolean isAdmin) {
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }

    public void setSector_id(int sector_id) {
        this.sector_id = sector_id;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSecurity_clearance(int security_clearance) {
        this.security_clearance = security_clearance;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public long getUser_id() {
        return user_id;
    }

    public int getSector_id() {
        return sector_id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getEmail() {
        return email;
    }

    public int getSecurity_clearance() {
        return security_clearance;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public void setDate_of_birth(LocalDate date_of_birth) {
        this.date_of_birth = date_of_birth;
    }

    public void setPostalcode(String postalcode) {
        this.postalcode = postalcode;
    }

    public String getBio() {
        return bio;
    }

    public String getOccupation() {
        return occupation;
    }

    public LocalDate getDate_of_birth() {
        return date_of_birth;
    }

    public String getPostalcode() {
        return postalcode;
    }

    public String getUser_goal() {
        return user_goal;
    }

    public void setUser_goal(String usergoal) {
        this.user_goal = usergoal;
    }

    public boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(boolean admin) {
        isAdmin = admin;
    }
}
