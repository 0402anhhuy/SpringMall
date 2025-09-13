package com.example.springmall.config;

import com.example.springmall.entity.Category;
import com.example.springmall.entity.Product;
import com.example.springmall.service.CategoryService;
import com.example.springmall.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CategoryService categoryService;
    private final ProductService productService;

    public DataSeeder(CategoryService categoryService, ProductService productService) {
        this.categoryService = categoryService;
        this.productService = productService;
    }

    @Override
    public void run(String... args) {
//        boolean isSuccessCategory = categoryService.deleteAll();
//        if (isSuccessCategory) {
//            System.out.println("Delete All Category");
//        }
//
//        boolean isSuccessProduct = productService.deleteAll();
//        if (isSuccessProduct) {
//            System.out.println("Delete All Products");
//        }

        insertOrUpdate("Vegetables", "/images/categories/veges/icon/Veges.jpg");
        insertOrUpdate("Fruits", "/images/categories/fruits/icon/Fruits.jpg");
        insertOrUpdate("Bread", "/images/categories/bread/icon/Bread.jpg");
        insertOrUpdate("Canned-goods", "/images/categories/canned-goods/icon/Canned-good.jpg");
        insertOrUpdate("Instant-foods", "/images/categories/instant-foods/icon/Noodles.jpg");
        insertOrUpdate("Spices", "/images/categories/spices/icon/Spices.jpg");
        insertOrUpdate("Beverages", "/images/categories/beverages/icon/Beverages.jpg");
        insertOrUpdate("Juices", "/images/categories/juices/icon/Juice.jpg");
        insertOrUpdate("Milk", "/images/categories/milk/icon/Milk.jpg");
        insertOrUpdate("Ice-cream", "/images/categories/ice-cream/icon/Ice-cream.jpg");

        System.out.println("DataSeeder đã chạy: Đã insert hoặc update category!");

        Category bread = categoryService.findByName("Bread");
        Category beverage = categoryService.findByName("Beverages");
        Category fruit = categoryService.findByName("Fruits");

        insertProduct("Mứt dâu", 30000, 50, "hộp", 20, "Golden Farm", LocalDate.of(2025, 2, 15), "Mứt dâu", "/images/categories/bread/products/Mut-dau.jpg", bread, 4.8, 47);
        insertProduct("Mứt dứa", 30000, 50, "hộp", 0, "Golden Farm", LocalDate.of(2025, 2, 15), "Mứt dứa", "/images/categories/bread/products/Mut-dua.jpg", bread, 4.4, 30);
        insertProduct("Hamburger", 5000, 100, "cái", 0, "BreadTalk", LocalDate.of(2025, 2, 20), "Hamburger", "/images/categories/bread/products/Banh-mi-Hamburger.jpg", bread, 4.8, 95);
        insertProduct("Bơ đậu phộng", 20000, 50, "hộp", 10, "BreadTalk", LocalDate.of(2025, 2, 22), "Bơ đậu phộng", "/images/categories/bread/products/Bo-dau-phong.jpg", bread, 4.6, 125);
        insertProduct("7 Up", 6000, 500, "lon", 0, "Pepsico", LocalDate.of(2025, 7, 16), "7 Up", "/images/categories/beverages/products/7Up.jpg", beverage, 4.6, 320);
        insertProduct("CocaCola", 6000, 500, "lon", 0, "Pepsico", LocalDate.of(2025, 7, 18), "CocaCola", "/images/categories/beverages/products/Cocacola.jpg", beverage, 4.4, 305);
        insertProduct("Trà Cascara", 8000, 500, "chai", 0, "Lof", LocalDate.of(2025, 7, 18), "Trà Cascara", "/images/categories/beverages/products/Tra-Cascara.jpg", beverage, 4.5, 310);
        insertProduct("Mít", 30000, 500, "kg", 0, "Unifarm", LocalDate.of(2025, 7, 20), "Mít", "/images/categories/fruits/products/Mit.jpg", fruit, 2.5, 200);
        insertProduct("Vú sữa", 50000, 400, "kg", 0, "Unifarm", LocalDate.of(2025, 7, 20), "Vú sữa", "/images/categories/fruits/products/Vu-sua.jpg", fruit, 4.6, 350);
        insertProduct("Táo", 40000, 400, "kg", 0, "Unifarm", LocalDate.of(2025, 7, 19), "Tao", "/images/categories/fruits/products/Tao.jpg", fruit, 4.3, 310);
        insertProduct("Nhẫn cưới", 40000, 400, "kg", 0, "Unifarm", LocalDate.of(2025, 7, 19), "Tao", "/images/categories/ice-cream/products/Nhan.png", fruit, 4.3, 310);
    }

    private void insertOrUpdate(String name, String imagePath) {
        Category existing = categoryService.findByName(name);
        if (existing == null) {
            Category newCategory = new Category(null, name, imagePath, null);
            categoryService.save(newCategory);
            System.out.println("➕ Inserted: " + name);
        }
        else {
            if (!imagePath.equals(existing.getImage())) {
                existing.setImage(imagePath);
                categoryService.save(existing);
                System.out.println("♻️ Updated image for: " + name);
            }
            else {
                System.out.println("✅ Đã tồn tại: " + name + " (không cần cập nhật)");
            }
        }
    }

    private void insertProduct(String name, int price, int quantity, String unitQuantity, int discount,
                               String brand, LocalDate expiryDate, String description, String image,
                               Category category, double rating, int ratingCount) {

        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setQuantity(quantity);
        product.setUnitQuantity(unitQuantity);
        product.setDiscount(discount);
        product.setBrand(brand);
        product.setExpiryDate(expiryDate);
        product.setDescription(description);
        product.setImage(image);
        product.setCategory(category);
        product.setCreatedAt(LocalDateTime.now());
        product.setRating(rating);
        product.setRatingCount(ratingCount);

        Product existing = productService.findByName(name);
        if (existing == null) {
            productService.save(product);
            System.out.println("➕ Product seeded: " + name);
        }
        else {
            boolean needUpdate = false;

            if (!image.equals(existing.getImage())) {
                existing.setImage(image);
                needUpdate = true;
            }

            if (existing.getRating() != rating || existing.getRatingCount() != ratingCount) {
                existing.setRating(rating);
                existing.setRatingCount(ratingCount);
                needUpdate = true;
            }

            if (!unitQuantity.equals(existing.getUnitQuantity())) {
                existing.setUnitQuantity(unitQuantity);
                needUpdate = true;
            }

            if (existing.getDiscount() != discount) {
                existing.setDiscount(discount);
                needUpdate = true;
            }

            if (needUpdate) {
                productService.save(existing);
                System.out.println("♻️ Updated: " + name);
            }
            else {
                System.out.println("✅ Đã tồn tại: " + name + " (không cần cập nhật)");
            }
        }
    }
}
