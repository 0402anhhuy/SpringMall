package com.example.springmall.controller;

import com.example.springmall.entity.Product;
import com.example.springmall.service.CartService;
import com.example.springmall.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {

    private final ProductService productService;
    private final CartService cartService;

    @GetMapping
    public String viewCart(Model model) {
        List<Product> trendingProducts = productService.findTrendingProduct();

        model.addAttribute("cartItems", cartService.getCartItems());
        model.addAttribute("total", cartService.getTotalPrice());
        model.addAttribute("recommendedProducts", trendingProducts);
        return "cart/cart";
    }

    @PostMapping("/add")
    public String addToCart(@RequestParam("productId") Long productId, @RequestParam("quantity") int quantity) {
        Product product = productService.findById(productId);
        cartService.addToCart(product, quantity);
        return "redirect:/cart";
    }

    @PostMapping("/remove")
    public String removeFromCart(@RequestParam("productId") Integer productId) {
        cartService.removeFromCart(productId);
        return "redirect:/cart";
    }

    @PostMapping("/clear")
    public String clearCart() {
        cartService.clearCart();
        return "redirect:/cart";
    }
}
