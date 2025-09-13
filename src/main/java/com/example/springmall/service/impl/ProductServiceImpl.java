package com.example.springmall.service.impl;

import com.example.springmall.entity.Product;
import com.example.springmall.repository.ProductRepository;
import com.example.springmall.service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepo) {
        this.productRepository = productRepo;
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product findByName(String name) {
        return productRepository.findByName(name);
    }

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> findTrendingProduct() {
        return productRepository.findTrendingProduct();
    }

    @Override
    public List<Product> findTrendingProductByCategory(String category) {
        return productRepository.findTrendingProductByCategory(category);
    }

    @Override
    public long countByCategoryId(Integer categoryId) {
        return productRepository.countByCategoryId(categoryId);
    }

    @Override
    public List<Product> searchByName(String keyword) {
        return productRepository.findByNameContaining(keyword);
    }

    @Override
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    @Transactional
    public boolean deleteAll() {
        productRepository.deleteAll();
        return true;
    }
}
