package com.example.springmall.service;

import com.example.springmall.entity.Product;

import java.util.List;

@SuppressWarnings("unused")
public interface ProductService {
    Product save(Product product);
    Product findById(Long id);
    Product findByName(String name);
    List<Product> findAll();
    List<Product> findTrendingProduct();
    List<Product> findTrendingProductByCategory(String category);
    long countByCategoryId(Integer categoryId);
    void deleteById(Long id);
    boolean deleteAll();
    List<Product> searchByName(String keyword);
}
