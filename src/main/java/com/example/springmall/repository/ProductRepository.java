package com.example.springmall.repository;

import com.example.springmall.entity.Product;
import java.util.List;

@SuppressWarnings("unused")
public interface ProductRepository {
    Product save(Product product);
    Product findById(Long id);
    List<Product> findAll();
    void deleteById(Long id);
    List<Product> findByCategoryId(Long categoryId);
    List<Product> findByNameContaining(String categoryName);
}
