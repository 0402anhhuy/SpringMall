package com.example.springmall.controller;

import com.example.springmall.entity.Brand;
import com.example.springmall.entity.Category;
import com.example.springmall.entity.Product;
import com.example.springmall.service.BrandService;
import com.example.springmall.service.CategoryService;
import com.example.springmall.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class HomeController {

    private final CategoryService categoryService;
    private final BrandService brandService;
    private final ProductService productService;

    @GetMapping("/")
    public String home(@RequestParam(defaultValue = "all") String category, Model model) {
        List<Category> categories = categoryService.findAll();
        List<Product> products = productService.findAll();

        List<Product> trendingProducts = "all".equalsIgnoreCase(category)
                ? productService.findTrendingProduct()
                : productService.findTrendingProductByCategory(category);

        model.addAttribute("categories", categories);
        model.addAttribute("products", products);
        model.addAttribute("category", category);
        model.addAttribute("trendingProducts", trendingProducts);

        return "index";
    }

    @GetMapping("/shop")
    public String list(Model model) {
        List<Category> categories = categoryService.findAll();
        List<Brand> brands = brandService.findAll();
        List<Product> products = productService.findAll();

        Map<Integer, Integer> productCounts = new HashMap<>();

        for (Product product : products) {
            Integer catId = product.getCategory().getId();
            productCounts.put(catId, productCounts.getOrDefault(catId, 0) + 1);
        }

        model.addAttribute("categories", categories);
        model.addAttribute("brands", brands);
        model.addAttribute("products", products);
        model.addAttribute("productCounts", productCounts);

        return "shop/list";
    }

    @GetMapping("/account")
    public String profile() {
        return "account/profile";
    }
}

