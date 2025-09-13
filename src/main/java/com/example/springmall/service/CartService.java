package com.example.springmall.service;

import com.example.springmall.entity.Product;
import com.example.springmall.model.CartItem;

import java.util.List;

public interface CartService {
    void addToCart(Product product, int quantity);
    void removeFromCart(Integer productId);
    void clearCart();
    List<CartItem> getCartItems();
    int getTotalPrice();
}
