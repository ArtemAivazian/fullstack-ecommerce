package cz.cvut.fel.service.impl;

import cz.cvut.fel.dto.ProductDto;
import cz.cvut.fel.entity.Product;
import cz.cvut.fel.mapper.Mapper;
import cz.cvut.fel.repository.ProductRepository;
import cz.cvut.fel.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Service implementation for managing product-related operations.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public ProductDto createProduct(ProductDto dto) {
        Product product = Mapper.convertToEntity(dto);
        Product savedProduct = productRepository.save(product);
        log.info("Product {} is saved", product.getId());
        return Mapper.convertToDto(savedProduct);
    }

    @Override
    @Transactional
    public Product checkProductAvailability(String productId, BigDecimal quantity) {
        Optional<Product> productOptional = productRepository.findById(productId);

        if (productOptional.isPresent()) {
            Product product = productOptional.get();

            // Check if there is enough stock
            if (product.getQuantity().compareTo(quantity) >= 0) {
                // Reduce the stock
                product.setQuantity(product.getQuantity().subtract(quantity));
                Product savedProduct = productRepository.save(product);
                log.info("Product {} stock updated, remaining quantity: {}", productId, product.getQuantity());
                return savedProduct;
            } else {
                log.warn("Not enough stock for product {}", productId);
                throw new RuntimeException("Not enough stock available for product: " + productId);
            }
        } else {
            log.warn("Product {} not found", productId);
            throw new RuntimeException("Product not found: " + productId);
        }
    }

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();

        return products.stream()
                .map(Mapper::convertToDto)
                .toList();
    }

    @Override
    public ProductDto getProductById(String productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found: " + productId));
        return Mapper.convertToDto(product);
    }

}
