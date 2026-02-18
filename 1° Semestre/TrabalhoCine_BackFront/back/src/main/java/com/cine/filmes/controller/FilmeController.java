package com.cine.filmes.controller;

import com.cine.filmes.entity.Filme;
import com.cine.filmes.repository.FilmeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/filmes")
@CrossOrigin(origins = "*") // Para permitir o acesso do front
public class FilmeController {

    private final FilmeRepository repository;

    public FilmeController(FilmeRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Filme criarFilme(@RequestBody Filme filme) {
        return repository.save(filme);
    }

    @GetMapping
    public List<Filme> listarFilmes() {
        return repository.findAll();
    }
}
