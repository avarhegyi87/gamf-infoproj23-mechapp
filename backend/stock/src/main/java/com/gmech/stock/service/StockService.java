package com.gmech.stock.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.gmech.stock.stock.Stock;
import com.gmech.stock.stock.StockRepository;
import com.gmech.stock.stock.StockRequest;
import com.gmech.stock.stock.StockResponse;
import com.gmech.stock.exception.DuplicateException;

@Service
@RequiredArgsConstructor
public class StockService {

    private final StockRepository stockRepository;

    @Autowired
    private final ModelMapper modelMapper;

    public StockResponse create(StockRequest request) {
        stockRepository.findByMaterialnumber(request.getMaterialnumber()).ifPresent(c -> {
            throw new DuplicateException("A megadott cikkszámmal már rendelkezik jármű!");
        });

        var stock = Stock.builder()
                .materialnumber(request.getMaterialnumber())
                .description(request.getDescription())
                .currentstock(request.getCurrentstock())
                .netprice(request.getNetprice())
                .build();

        return this.modelMapper.map(
                stockRepository.save(stock),
                StockResponse.class);
    }
}