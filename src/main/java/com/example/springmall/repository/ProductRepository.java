package com.example.springmall.repository;

import com.example.springmall.entity.Product;
import java.util.List;

@SuppressWarnings("unused")
public interface ProductRepository {
    Product save(Product product);
    Product findById(Long id);
    Product findByName(String name);
    List<Product> findAll();
    List<Product> findTrendingProduct();
    List<Product> findTrendingProductByCategory(String category);
    List<Product> findByNameContaining(String categoryName);
    long countByCategoryId(Integer categoryId);
    void deleteById(Long id);
    boolean deleteAll();
}
