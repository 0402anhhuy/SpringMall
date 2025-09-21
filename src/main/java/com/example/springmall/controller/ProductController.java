package com.example.springmall.controller;

import com.example.springmall.entity.Category;
import com.example.springmall.entity.Product;
import com.example.springmall.service.CategoryService;
import com.example.springmall.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/shop")
public class ProductController {

    private final CategoryService categoryService;
    private final ProductService productService;

    @GetMapping("/product-detail")
    public String productDetail(@RequestParam("id") Long id, Model model) {
        Product product = productService.findById(id);
        List<Category> categories = categoryService.findAll();

        model.addAttribute("product", product);
        model.addAttribute("categories", categories);
        return "shop/product-detail";
    }
}
