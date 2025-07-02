package com.example.springmall.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    private Double price;

    private String image;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
