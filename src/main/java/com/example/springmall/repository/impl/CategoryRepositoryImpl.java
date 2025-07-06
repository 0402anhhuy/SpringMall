package com.example.springmall.repository.impl;

import com.example.springmall.entity.Category;
import com.example.springmall.repository.CategoryRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public class CategoryRepositoryImpl implements CategoryRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public Category save(Category category) {
        if (category.getId() == null || category.getId() == 0 || entityManager.find(Category.class, category.getId()) == null) {
            // Nếu là entity mới → insert
            entityManager.persist(category);
            return category;
        } else {
            // Nếu đã có ID và tồn tại trong DB → update
            return entityManager.merge(category);
        }
    }


    @Override
    public Category findById(int id) {
        return entityManager.find(Category.class, id);
    }

    @Override
    public List<Category> findAll() {
        String jpql = "SELECT c FROM Category c";
        return entityManager.createQuery(jpql, Category.class).getResultList();
    }

    @Override
    public void deleteById(int id) {
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
        return result.isEmpty() ? null : result.getFirst();
    }
}
