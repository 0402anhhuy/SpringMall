package com.example.springmall.service.impl;

import com.example.springmall.entity.Category;
import com.example.springmall.repository.CategoryRepository;
import com.example.springmall.service.CategoryService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category findById(int id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category findByName(String name) {
        return categoryRepository.findByName(name);
    }

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public void deleteById(int id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public void updateImage(int categoryId, String newImageUrl) {
        Category category = categoryRepository.findById(categoryId);
        if (category != null) {
            category.setImage(newImageUrl);
            categoryRepository.save(category);
        }
    }

    @Override
    @Transactional
    public boolean deleteAll() {
        categoryRepository.deleteAll();
        return true;
    }
}
