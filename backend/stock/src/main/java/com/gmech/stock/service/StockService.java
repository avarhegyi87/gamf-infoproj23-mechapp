package com.gmech.stock.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.gmech.stock.stock.Stock;
import com.gmech.stock.stock.StockRepository;
import com.gmech.stock.stock.StockRequest;
import com.gmech.stock.stock.StockResponse;
import com.gmech.stock.exception.DuplicateException;
import com.gmech.stock.exception.IncorrectMatnumberException;

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

    public StockResponse get(String materialnumber) {
        var stock = stockRepository.findByMaterialnumber(materialnumber)
                .orElseThrow(() -> new IncorrectMatnumberException("A megadott aznosító nem létezik!"));
        return this.modelMapper.map(
                stock,
                StockResponse.class);
    }

    public List<StockResponse> getAll() {
        var stocks = stockRepository.findAll();

        return stocks.stream().map((stock) -> modelMapper.map(stock, StockResponse.class))
                .collect(Collectors.toList());

    }
}