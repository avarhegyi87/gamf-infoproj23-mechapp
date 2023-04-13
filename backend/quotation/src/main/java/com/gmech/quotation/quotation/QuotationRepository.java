package com.gmech.quotation.quotation;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuotationRepository extends JpaRepository<Quotation, Integer> {
    
}
