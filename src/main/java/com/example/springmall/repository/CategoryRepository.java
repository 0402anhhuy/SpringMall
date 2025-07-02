package com.example.springmall.repository;

import com.example.springmall.entity.Category;

import java.util.List;

@SuppressWarnings("unused")
public interface CategoryRepository {
    Category save(Category category);
    Category findById(Long id);
    List<Category> findAll();
    void deleteById(Long id);
    Category findByName(String name);
}
