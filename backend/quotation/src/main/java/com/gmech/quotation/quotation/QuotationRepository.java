package com.gmech.quotation.quotation;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuotationRepository extends JpaRepository<Quotation, Integer> {
    Optional<Quotation> findByVehicleId(Integer vehicleId);    
}
