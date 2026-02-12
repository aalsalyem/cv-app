package dev.salyem.cv.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "strengths")
public class Strength {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(name = "sort_order")
    private Integer sortOrder;
}
