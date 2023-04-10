package com.gmech.customer.customer;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByEmail(String email);

    Optional<Customer> findByName(String name);

    Optional<Customer> findByPhoneNumber(String phoneNumber);
}
