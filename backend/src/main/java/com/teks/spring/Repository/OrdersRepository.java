package com.teks.spring.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.teks.spring.entity.Orders;

public interface OrdersRepository 
        extends JpaRepository<Orders, Long> {

    // ✅ Get orders by user
    List<Orders> findByUserId(Long userId);

}