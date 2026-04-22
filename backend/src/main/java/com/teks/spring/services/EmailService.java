package com.teks.spring.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.teks.spring.entity.Orders;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOrderConfirmation(Orders order) {
    	
    	System.out.println("Sending email to: " + order.getEmail());

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(order.getEmail());

        message.setSubject(
                "Order Confirmation - E-Commerce");

        message.setText(

                "Hello " + order.getEmail() + ",\n\n" +

                "🎉 Your order has been placed successfully!\n\n" +

                "📦 Order Details:\n" +
                "Product: " + order.getTitle() + "\n" +
                "Quantity: " + order.getQuantity() + "\n" +
                "Price: ₹" + order.getPrice() + "\n\n" +

                "Thank you for shopping with us!\n" +
                "🛒 E-Commerce Team"
        );

        mailSender.send(message);
    }
}