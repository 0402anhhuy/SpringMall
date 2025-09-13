package com.example.springmall.repository.impl;

import com.example.springmall.entity.Category;
import com.example.springmall.repository.CategoryRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CategoryRepositoryImpl implements CategoryRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Category findById(int id) {
        return entityManager.find(Category.class, id);
    }

    @Override
    public Category findByName(String name) {
        String hql = "SELECT c FROM Category c WHERE c.name = :name";
        Query query = entityManager.createQuery(hql);
        query.setParameter("name", name);
        return (Category) query.getSingleResult();
    }

    @Override
    public List<Category> findAll() {
        String jpql = "SELECT c FROM Category c";
        return entityManager.createQuery(jpql, Category.class).getResultList();
    }

    @Override
    @Transactional
    public Category save(Category category) {
        if (category.getId() == null || category.getId() == 0 || entityManager.find(Category.class, category.getId()) == null) {
            entityManager.persist(category);
            return category;
        }
        else {
            return entityManager.merge(category);
        }
    }

    @Override
    public void deleteById(int id) {
        Category category = findById(id);
        if (category != null) {
            entityManager.remove(category);
        }
    }

    @Override
    @Transactional
    public boolean deleteAll() {
        String jpql = "DELETE FROM Category";
        entityManager.createQuery(jpql).executeUpdate();
        entityManager.createNativeQuery("ALTER TABLE category AUTO_INCREMENT = 1").executeUpdate();
        return true;
    }
}
