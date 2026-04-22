package com.teks.spring.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.teks.spring.entity.User;

public interface UserRepository 
       extends JpaRepository<User, Long> {

	User findByEmailAndPassword(String email, String password);
}
