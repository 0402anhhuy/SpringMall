package com.example.springmall.repository;

import com.example.springmall.entity.Category;

import java.util.List;

@SuppressWarnings("unused")
public interface CategoryRepository {
    Category save(Category category);
    Category findById(int id);
    List<Category> findAll();
    void deleteById(int id);
    Category findByName(String name);
}
