package com.cine.filmes.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Filme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255)
    private String titulo;

    @Column(length = 1000)
    private String imagemUrl;

    @Column(length = 1000)
    private String trailerUrl;
}