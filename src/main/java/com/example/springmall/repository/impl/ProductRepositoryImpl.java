package com.example.springmall.repository.impl;

import com.example.springmall.entity.Product;
import com.example.springmall.repository.ProductRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductRepositoryImpl implements ProductRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Product save(Product product) {
        if(product.getId()==null){
            entityManager.persist(product);
            return product;
        }
        else {
            return entityManager.merge(product);
        }
    }

    @Override
    public Product findById(Long id) {
        return entityManager.find(Product.class, id);
    }

    @Override
    public List<Product> findAll() {
        String jpql = "SELECT p FROM Product p";
        return entityManager.createQuery(jpql, Product.class).getResultList();
    }

    @Override
    public void deleteById(Long id) {
        Product product = findById(id);
        if(product != null){
            entityManager.remove(product);
        }
    }

    @Override
    public List<Product> findByCategoryId(Long categoryId) {
        String jpql = "SELECT p FROM Product p WHERE p.category.id = :cid";
        return entityManager.createQuery(jpql, Product.class).setParameter("cid", categoryId).getResultList();
    }

    @Override
    public List<Product> findByNameContaining(String categoryName) {
        String jpql = "SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(:kw)";
        return entityManager.createQuery(jpql, Product.class).setParameter("kw", "%" + categoryName + "%").getResultList();
    }
}
