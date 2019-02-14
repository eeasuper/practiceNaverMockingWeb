package com.nano.naver_m.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.nano.naver_m.assemblers.ProductResourceAssembler;
import com.nano.naver_m.exceptions.ProductNotFoundException;
import com.nano.naver_m.models.Product;
import com.nano.naver_m.repository.ProductRepository;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

@RestController
public class ProductController {
	private final ProductRepository repository;
	private final ProductResourceAssembler assembler;
	
	public ProductController(ProductRepository repository, ProductResourceAssembler assembler) {
		super();
		this.repository = repository;
		this.assembler = assembler;
	}
	
	@GetMapping("/api/products")
	public 
	Resources<Resource<Product>> all(){
		
		List<Resource<Product>> products = repository.findAll().stream()
				.map(assembler :: toResource)
				.collect(Collectors.toList());
		
		return new Resources<>(products,
				linkTo(methodOn(ProductController.class).all()).withSelfRel());
	}
	
	@GetMapping("/api/products/{id}")
	public Resource<Product> one(@PathVariable Long id) {
		return assembler.toResource(repository.findById(id)
				.orElseThrow(()-> new ProductNotFoundException(id)));
	}
	
	
}
