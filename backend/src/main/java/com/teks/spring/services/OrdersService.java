package com.teks.spring.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teks.spring.Repository.OrdersRepository;
import com.teks.spring.entity.Orders;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private EmailService emailService;

    // Save Order
    public Orders saveOrder(Orders order) {

        // Save order
        Orders savedOrder =
                ordersRepository.save(order);

        try {

            // Send email
            emailService
                .sendOrderConfirmation(savedOrder);

        }
        catch (Exception e) {

            System.out.println(
                "Email sending failed: " +
                e.getMessage()
            );

        }

        return savedOrder;
    }

    // Get All Orders
    public List<Orders> getAllOrders() {

        return ordersRepository.findAll();

    }

    // Delete Order
    public void deleteOrder(Long id) {

        ordersRepository.deleteById(id);

    }

    // Get Orders by User
    public List<Orders> getOrdersByUserId(Long userId) {

        return ordersRepository.findByUserId(userId);

    }
}