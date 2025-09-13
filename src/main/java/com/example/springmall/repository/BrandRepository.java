package com.example.springmall.repository;

import com.example.springmall.entity.Brand;

import java.util.List;

@SuppressWarnings("unused")
public interface BrandRepository {
    List<Brand> findAll();
    Brand findById(int id);
    Brand findByName(String name);
    Brand save(Brand brand);
    void delete(Brand brand);
}