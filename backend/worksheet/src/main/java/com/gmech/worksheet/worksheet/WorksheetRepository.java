package com.gmech.worksheet.worksheet;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WorksheetRepository extends JpaRepository<Worksheet, Integer> {
    
}
