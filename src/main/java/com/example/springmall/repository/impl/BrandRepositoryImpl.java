package com.example.springmall.repository.impl;

import com.example.springmall.entity.Brand;
import com.example.springmall.repository.BrandRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BrandRepositoryImpl implements BrandRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Brand> findAll() {
        String jpql = "SELECT b FROM Brand b";
        return entityManager.createQuery(jpql, Brand.class).getResultList();
    }

    @Override
    public Brand findById(int id) {
        return entityManager.find(Brand.class, id);
    }

    @Override
    public Brand findByName(String name) {
        String jpql = "SELECT b FROM Brand b WHERE b.name = :name";
        return entityManager.createQuery(jpql, Brand.class).setParameter("name", name).getSingleResult();
    }

    @Override
    @Transactional
    public Brand save(Brand brand) {
        if (brand.getId() == null || brand.getId() == 0 || entityManager.find(Brand.class, brand.getId()) == null) {
            entityManager.persist(brand);
            return brand;
        }
        else {
            return entityManager.merge(brand);
        }
    }

    @Override
    public void delete(Brand brand) {
        entityManager.remove(brand);
    }
}
