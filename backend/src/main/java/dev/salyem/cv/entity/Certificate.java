package dev.salyem.cv.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "certificates")
public class Certificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String issuer;
    private String date;

    @Column(name = "sort_order")
    private Integer sortOrder;
}
