package com.gmech.stock.stock;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import jakarta.transaction.Transactional;

@Transactional
public interface StockRepository extends JpaRepository<Stock, String> {

    Optional<Stock> findByMaterialNumber(String materialNumber);

    Optional<Stock> deleteByMaterialNumber(String materialNumber);
}
