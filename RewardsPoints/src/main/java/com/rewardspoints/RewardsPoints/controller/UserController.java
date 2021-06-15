package com.rewardspoints.RewardsPoints.controller;

import com.rewardspoints.RewardsPoints.exception.ResourceNotFoundException;
import com.rewardspoints.RewardsPoints.repository.UserRepository;
import com.rewardspoints.RewardsPoints.user.User;
import jdk.jfr.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    //Get list of users
    @GetMapping("users")
    public List<User> getUsers() {
        return this.userRepository.findAll();
    }

    //Create new user
    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    //Get user with specific Id
    @GetMapping("users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with the id: " + id));
        return ResponseEntity.ok(user);
    }

    //Update purchase on user
    @PutMapping("users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with the id: " + id));
        float price = userDetails.getTotal();
        int points = 0;

        if (price > 50) {
            if (price > 100) {
                points = 50 + (((int)price - 100)*2);
            } else {
                points = (int)price - 50;
            }
        }

        user.setTotal(user.getTotal() + price);
        user.setPoints(user.getPoints() + points);

        User newUser = userRepository.save(user);
        return ResponseEntity.ok(newUser);
    }
}

