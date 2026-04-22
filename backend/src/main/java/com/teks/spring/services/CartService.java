package com.teks.spring.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teks.spring.Repository.CartRepository;
import com.teks.spring.entity.Cart;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    // Add to Cart
    public Cart addToCart(Cart cart) {

        return cartRepository.save(cart);

    }
    
    public List<Cart> getCartItemsByUser(Long userId) {

        return cartRepository.findByUserId(userId);

    }

    // Get All Cart Items
    public List<Cart> getCartItems() {

        return cartRepository.findAll();

    }

    // Delete Item
    public void deleteCartItem(Long id) {

        cartRepository.deleteById(id);

    }

}