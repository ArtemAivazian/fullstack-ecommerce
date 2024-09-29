package cz.cvut.fel.controller;

import cz.cvut.fel.dto.ProductDto;
import cz.cvut.fel.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing product-related operations.
 *
 * This controller provides endpoints for creating new products and fetching all available products.
 */
@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    /**
     * Creates a new product.
     *
     * This endpoint is restricted to users with the 'ADMIN' role. It accepts a {@link ProductDto} in the request body
     * and returns the created product.
     *
     * @param productDto the product details to be created.
     * @return a {@link ResponseEntity} containing the created product and HTTP status 201 (Created).
     */
    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto) {
        ProductDto dto =  productService.createProduct(productDto);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    /**
     * Fetches all products.
     *
     * This endpoint is accessible to all users and returns a list of all available products.
     *
     * @return a {@link ResponseEntity} containing a list of {@link ProductDto} objects and HTTP status 200 (OK).
     */
    @GetMapping("/all")
    @PreAuthorize("permitAll()")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<ProductDto> productDtos =  productService.getAllProducts();
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

    /**
     * Fetches a product by its ID.
     *
     * This endpoint is accessible to all users and returns the product details if found.
     *
     * @param productId the ID of the product to be fetched.
     * @return a {@link ResponseEntity} containing the {@link ProductDto} and HTTP status 200 (OK).
     */
    @GetMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<ProductDto> getProductById(@PathVariable("id") String productId) {
        ProductDto productDto = productService.getProductById(productId);
        return new ResponseEntity<>(productDto, HttpStatus.OK);
    }




}
