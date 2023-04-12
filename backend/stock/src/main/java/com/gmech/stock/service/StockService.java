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

import jakarta.transaction.Transactional;

import com.gmech.stock.exception.DuplicateException;
import com.gmech.stock.exception.IncorrectMatnumberException;

@Service
@RequiredArgsConstructor
@Transactional
public class StockService {

        private final StockRepository stockRepository;

        @Autowired
        private final ModelMapper modelMapper;

        public StockResponse create(StockRequest request) {
                stockRepository.findByMaterialNumber(request.getMaterialNumber()).ifPresent(c -> {
                        throw new DuplicateException("A megadott cikkszámmal már rendelkezik jármű!");
                });

                var stock = Stock.builder()
                                .materialNumber(request.getMaterialNumber())
                                .description(request.getDescription())
                                .currentStock(request.getCurrentStock())
                                .netPrice(request.getNetPrice())
                                .build();

                return this.modelMapper.map(
                                stockRepository.save(stock),
                                StockResponse.class);
        }

        public StockResponse get(String materialNumber) {
                var stock = stockRepository.findByMaterialNumber(materialNumber)
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

        public StockResponse put(StockRequest request) {

                var stock = stockRepository.findByMaterialNumber(request.getMaterialNumber())
                                .orElseThrow(() -> new IncorrectMatnumberException("A megadott aznosító nem létezik!"));

                stock.setDescription(request.getDescription());
                stock.setCurrentStock(request.getCurrentStock());
                stock.setNetPrice(request.getNetPrice());

                stockRepository.save(stock);
                return this.modelMapper.map(
                                stock,
                                StockResponse.class);

        }

        public void delete(String materialNumber) {
                stockRepository.findByMaterialNumber(materialNumber)
                                .orElseThrow(() -> new IncorrectMatnumberException("A megadott aznosító nem létezik!"));

                stockRepository.deleteByMaterialNumber(materialNumber);
        }
}