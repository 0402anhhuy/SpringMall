package com.example.springmall.service;

import com.example.springmall.entity.Category;

import java.util.List;

@SuppressWarnings("unused")
public interface CategoryService {
    Category save(Category category);
    Category findById(int id);
    Category findByName(String name);
    List<Category> findAll();
    void deleteById(int id);
    void updateImage(int categoryId, String newImageUrl);
}