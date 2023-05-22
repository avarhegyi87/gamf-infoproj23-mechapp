package com.gmech.worksheet.worksheet;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WorksheetRepository extends JpaRepository<Worksheet, Integer> {
    Optional<Worksheet> findByQuotationId(Integer quotationId);

}
