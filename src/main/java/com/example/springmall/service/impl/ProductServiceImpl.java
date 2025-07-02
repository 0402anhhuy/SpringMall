package com.example.springmall.service.impl;

import com.example.springmall.entity.Product;
import com.example.springmall.repository.ProductRepository;
import com.example.springmall.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepo;

    public ProductServiceImpl(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    @Override
    public Product save(Product product) {
        return productRepo.save(product);
    }

    @Override
    public Product findById(Long id) {
        return productRepo.findById(id);
    }

    @Override
    public List<Product> findAll() {
        return productRepo.findAll();
    }

    @Override
    public void deleteById(Long id) {
        productRepo.deleteById(id);
    }

    @Override
    public List<Product> findByCategoryId(Long categoryId) {
        return productRepo.findByCategoryId(categoryId);
    }

    @Override
    public List<Product> searchByName(String keyword) {
        return productRepo.findByNameContaining(keyword);
    }
}
