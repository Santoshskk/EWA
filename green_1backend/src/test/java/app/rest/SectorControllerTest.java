package app.rest;

import app.models.Sector;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Test class for SectorController
 * @author Romello ten Broeke
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SectorControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    private Sector sector;

    @BeforeEach
    void setup() {
        // arrange
        sector = new Sector((long) 1, "The new sector", "The new sector description");
    }
// FIRST
    @Test
    public void allSectorsCanBeRetrieved() {
        // act
        ResponseEntity<Sector[]> response =
                this.restTemplate.getForEntity("/sector/all", Sector[].class);

        // assert
        assertEquals(HttpStatus.OK, response.getStatusCode(), "Status code should be 200 OK");
    }
// FIRST
    @Test
    public void sectorCanBeAdded() {
        // act
        ResponseEntity<Sector> response =
                this.restTemplate.postForEntity("/sector/0", sector, Sector.class);

        // assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode(), "Status code should be 201 CREATED");
    }
// FIRST
    @Test
    public void sectorCanBeEdited() {
        // arrange
        sector.setName("The edited sector");

        // act
        ResponseEntity<Sector> response =
                this.restTemplate.postForEntity("/sector/1", sector, Sector.class);

        // assert
        assertEquals(HttpStatus.OK, response.getStatusCode(), "Status code should be 200 OK");
        assertEquals("The edited sector", Objects.requireNonNull(response.getBody()).getName(),
                "Name should be 'The edited sector'");
    }
// FIRST
    @Test
    public void sectorCantBeDeleted() {
        // act
        ResponseEntity<Void> response =
                this.restTemplate.exchange("/sector/1", HttpMethod.DELETE, null, Void.class);

        // assert
        assertEquals(HttpStatus.CONFLICT, response.getStatusCode(), "Status code should be 409 CONFLICT");
    }
// FIRST
    @Test
    public void sectorCanBeRetrievedById() {
        // act
        ResponseEntity<Sector> response =
                this.restTemplate.getForEntity("/sector/1", Sector.class);

        // assert
        assertEquals(HttpStatus.OK, response.getStatusCode(), "Status code should be 200 OK");
    }
// FIRST
    @Test
    public void sectorCantBeFound() {
        // act
        ResponseEntity<?> response =
                this.restTemplate.getForEntity("/sector/7", Void.class);

        // assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode(), "Status code should be 404 NOT FOUND");
    }
}

