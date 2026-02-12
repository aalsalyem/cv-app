package dev.salyem.cv.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "education")
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String degree;
    private String field;
    private String school;
    private String location;

    @Column(name = "start_date")
    private String startDate;

    @Column(name = "end_date")
    private String endDate;

    @Column(name = "sort_order")
    private Integer sortOrder;
}
