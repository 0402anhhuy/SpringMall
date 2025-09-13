package com.example.springmall.repository;

import com.example.springmall.entity.Category;

import java.util.List;

@SuppressWarnings("unused")
public interface CategoryRepository {
    Category findById(int id);
    Category findByName(String name);
    List<Category> findAll();
    Category save(Category category);
    void deleteById(int id);
    boolean deleteAll();
}
