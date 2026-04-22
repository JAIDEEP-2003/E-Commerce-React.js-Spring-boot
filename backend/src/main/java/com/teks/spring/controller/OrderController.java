package com.teks.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.teks.spring.entity.Orders;
import com.teks.spring.services.OrdersService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrdersService ordersService;

    // Save Order
    @PostMapping
    public Orders saveOrder(
            @RequestBody Orders order) {

        return ordersService.saveOrder(order);

    }
    // Get Orders
    @GetMapping
    public List<Orders> getAllOrders() {

        return ordersService.getAllOrders();

    }
    @GetMapping("/{userId}")
    public List<Orders> getOrdersByUserId(
            @PathVariable Long userId) {

        return ordersService.getOrdersByUserId(userId);

    }
    
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {

        ordersService.deleteOrder(id);

    }

}