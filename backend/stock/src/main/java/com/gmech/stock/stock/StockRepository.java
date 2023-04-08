package com.gmech.stock.stock;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, String> {

    Optional<Stock> findByMaterialnumber(String materialnumber);

}
