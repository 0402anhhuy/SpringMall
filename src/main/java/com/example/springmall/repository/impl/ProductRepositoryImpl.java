package com.example.springmall.repository.impl;

import com.example.springmall.entity.Product;
import com.example.springmall.repository.ProductRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductRepositoryImpl implements ProductRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public Product save(Product product) {
        if(product.getId() == null){
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
    public Product findByName(String name) {
        String jpql = "SELECT p FROM Product p WHERE p.name = :name";
        List<Product> result = entityManager.createQuery(jpql, Product.class)
                .setParameter("name", name)
                .getResultList();
        return result.isEmpty() ? null : result.getFirst();
    }


    @Override
    public List<Product> findAll() {
        String jpql = "SELECT p FROM Product p";
        return entityManager.createQuery(jpql, Product.class).getResultList();
    }

    @Override
    public List<Product> findByNameContaining(String categoryName) {
        String jpql = "SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(:kw)";
        return entityManager.createQuery(jpql, Product.class).setParameter("kw", "%" + categoryName + "%").getResultList();
    }

    @Override
    public List<Product> findTrendingProduct() {
        String jpql = "SELECT p FROM Product p " +
                "WHERE p.discount > 0 OR p.rating >= 4 " +
                "ORDER BY p.rating DESC, p.ratingCount DESC";

        return entityManager.createQuery(jpql, Product.class).getResultList();
    }

    @Override
    public List<Product> findTrendingProductByCategory(String categoryName) {
        String jpql = "SELECT p FROM Product p WHERE (p.discount > 0 OR p.rating >= 4) AND LOWER(p.category.name) = LOWER(:categoryName) ORDER BY p.rating DESC, p.ratingCount DESC";
        return entityManager.createQuery(jpql, Product.class).setParameter("categoryName", categoryName).setMaxResults(6).getResultList();
    }

    @Override
    public long countByCategoryId(Integer categoryId) {
        String jpql = "SELECT COUNT(p) FROM Product p WHERE p.category.id = :cid";
        return entityManager.createQuery(jpql, Long.class).setParameter("cid", categoryId).getSingleResult();
    }

    @Override
    public void deleteById(Long id) {
        Product product = findById(id);
        if(product != null){
            entityManager.remove(product);
        }
    }

    @Override
    @Transactional
    public boolean deleteAll() {
        String jpql = "DELETE FROM Product";
        entityManager.createQuery(jpql).executeUpdate();
        entityManager.createNativeQuery("ALTER TABLE product AUTO_INCREMENT = 1").executeUpdate();
        return true;
    }
}
