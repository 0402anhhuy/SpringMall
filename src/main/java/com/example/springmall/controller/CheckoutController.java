package com.example.springmall.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/order")
public class CheckoutController {
    @GetMapping
    public String checkout() {
        return "order/checkout";
    }
}
