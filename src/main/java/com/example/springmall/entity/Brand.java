package com.example.springmall.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "brand")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 50, unique = true)
    private String name;

    @Column(nullable = false)
    private String logo;

    @OneToMany(mappedBy = "brand", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products;
}
