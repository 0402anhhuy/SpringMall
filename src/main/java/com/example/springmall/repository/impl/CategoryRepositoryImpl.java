package com.example.springmall.repository.impl;

import com.example.springmall.entity.Category;
import com.example.springmall.repository.CategoryRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CategoryRepositoryImpl implements CategoryRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Category save(Category category) {
        if (category.getId() == null) {
            entityManager.persist(category);
            return category;
        } else {
            return entityManager.merge(category);
        }
    }

    @Override
    public Category findById(Long id) {
        return entityManager.find(Category.class, id);
    }

    @Override
    public List<Category> findAll() {
        String jpql = "SELECT c FROM Category c";
        return entityManager.createQuery(jpql, Category.class).getResultList();
    }

    @Override
    public void deleteById(Long id) {
        Category category = findById(id);
        if (category != null) {
            entityManager.remove(category);
        }
    }

    @Override
    public Category findByName(String name) {
        String jpql = "SELECT c FROM Category c WHERE LOWER(c.name) = LOWER(:name)";
        TypedQuery<Category> query = entityManager.createQuery(jpql, Category.class);
        query.setParameter("name", name);
        List<Category> result = query.getResultList();
        return result.isEmpty() ? null : result.get(0);
    }
}