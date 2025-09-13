package com.example.springmall.service.impl;

import com.example.springmall.entity.Product;
import com.example.springmall.model.CartItem;
import com.example.springmall.service.CartService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartServiceImpl implements CartService {
    private final HttpSession session;
    private static final String CART_SESSION = "CART_ITEMS";

    public CartServiceImpl(HttpSession session) {
        this.session = session;
    }

    @SuppressWarnings("unchecked")
    private List<CartItem> getSessionCart() {
        return (List<CartItem>) session.getAttribute(CART_SESSION);
    }

    @Override
    public void addToCart(Product product, int quantity) {
        List<CartItem> cart = getSessionCart();
        if (cart == null) cart = new ArrayList<>();

        for (CartItem item : cart) {
            if (item.getProduct().getId().equals(product.getId())) {
                item.setQuantity(item.getQuantity() + quantity);
                session.setAttribute(CART_SESSION, cart);
                return;
            }
        }

        cart.add(new CartItem(product, quantity));
        session.setAttribute(CART_SESSION, cart);
    }

    @Override
    public void removeFromCart(Integer productId) {
        List<CartItem> cart = getSessionCart();
        if (cart == null) return;

        Iterator<CartItem> iterator = cart.iterator();
        while (iterator.hasNext()) {
            CartItem item = iterator.next();
            if (Objects.equals(item.getProduct().getId(), productId)) {
                iterator.remove();
                break;
            }
        }

        session.setAttribute(CART_SESSION, cart);
    }


    @Override
    public void clearCart() {
        session.removeAttribute(CART_SESSION);
    }

    @Override
    public List<CartItem> getCartItems() {
        return Optional.ofNullable(getSessionCart()).orElse(new ArrayList<>());
    }

    @Override
    public int getTotalPrice() {
        int total = 0;
        for (CartItem item : getCartItems()) {
            int price = item.getProduct().getPrice();
            int discount = item.getProduct().getDiscount();
            int finalPrice = price - discount;
            total += finalPrice * item.getQuantity();
        }
        return total;
    }
}
