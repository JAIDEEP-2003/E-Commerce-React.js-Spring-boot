package com.teks.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teks.spring.Repository.UserRepository;
import com.teks.spring.entity.User;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins ="*" )      //"http://localhost:5173"

public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ===============================
    // REGISTER USER
    // ===============================

    @PostMapping("/register")
    public User registerUser(
            @RequestBody User user) {

        return userRepository.save(user);
    }

    // ===============================
    // TEST USERS
    // ===============================

    @GetMapping("/test")
    public List<User> test() {

        return userRepository.findAll();

    }

 
    // =============================== 
    // LOGIN USER
    // ===============================

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody User user) {

        User existingUser =
                userRepository 
                        .findByEmailAndPassword(
                                user.getEmail(),
                                user.getPassword()
                        );

        if (existingUser != null) {

            return ResponseEntity.ok(existingUser);

        } else {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Email or Password");

        }
    }

}