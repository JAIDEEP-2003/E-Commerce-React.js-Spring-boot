package com.teks.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.teks.spring.entity.Cart;
import com.teks.spring.services.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    // Add item to cart
    @PostMapping
    public Cart addToCart(
            @RequestBody Cart cart) {

        return cartService.addToCart(cart);

    }

    // Get all cart items
    //@GetMapping("/details")
    @GetMapping("/details/{userId}")
    public List<Cart> getCartItemsByUser(
            @PathVariable Long userId) {

        return cartService.getCartItemsByUser(userId);

    }

    // Delete item
    @DeleteMapping("/{id}")
    public void deleteCartItem(
            @PathVariable Long id) {

        cartService.deleteCartItem(id);

    }

}