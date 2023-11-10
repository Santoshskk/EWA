package app.rest;

import app.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import app.repositories.UsersRepository;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UsersRepository<User> usersRepository;

    @GetMapping(path = "/all", produces = "application/json")
    public List<User> getAllUsers(){
        return usersRepository.findAll();
    }

    /**
     * this api is for getting the given ids for users
     * @param id the id given in the url
     * @return
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getOfferById(@PathVariable long id) {
        User user = usersRepository.findById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            throw new ResourceNotFoundException("User not found with ID: " + id);
        }
    }

    /**
     * Delete an user with the specified ID.
     * @param id id of the user to be deleted.
     * @return A ResponseEntity containing the deleted User if the deletion is successful.
     * @throws ResourceNotFoundException if the user with the specified ID is not found.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteOffer(@PathVariable long id) {
        User offer = usersRepository.deletedById(id);
        if (offer != null) {
            return ResponseEntity.ok(offer);
        } else {
            throw new ResourceNotFoundException("User not found with ID: " + id);
        }
    }

    /**
     * Update an user with the specified ID by replacing it with the provided user object.
     * @param id    The id of the user that is going to be updated.
     * @param user the user with updated information.
     * @return A ResponseEntity containing the updated user if the update is successful.
     * @throws PreConditionFailedException if the provided ID in the path does not match the ID in the request body.
     * @throws ResourceNotFoundException    if the offer with the specified ID is not found.
     */
    @PutMapping("/{id}")
    public ResponseEntity<User> updateOffer(@PathVariable long id, @RequestBody User user) {
        if (id != user.getUser_id()) {
            throw new PreConditionFailedException("ID in the path does not match ID in the request body");
        }
        if (usersRepository.findById(id) != null) {
            user.setUser_id((int) id);
            user = usersRepository.save(user);
            return ResponseEntity.ok(user);
        } else {
            throw new ResourceNotFoundException("Offer not found with ID: " + id);
        }
    }
}
