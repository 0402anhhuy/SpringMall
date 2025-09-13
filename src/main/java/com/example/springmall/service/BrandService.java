package com.example.springmall.service;

import com.example.springmall.entity.Brand;

import java.util.List;

@SuppressWarnings("unused")
public interface BrandService {
    List<Brand> findAll();
    Brand findById(int id);
    Brand findByName(String name);
    Brand save(Brand brand);
    void delete(Brand brand);
}