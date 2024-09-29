package cz.cvut.fel.service;

import cz.cvut.fel.dto.ProductDto;
import cz.cvut.fel.entity.Product;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

/**
 * Interface for managing product-related operations.
 */
public interface ProductService {

    /**
     * Creates a new product.
     *
     * @param dto the {@link ProductDto} containing product details to be created.
     * @return the created {@link ProductDto}.
     */
    ProductDto createProduct(ProductDto dto);

    /**
     * Checks the availability of a product and reduces its stock.
     *
     * If the product is available and has enough stock, the quantity will be reduced.
     *
     * @param productId the ID of the product to be checked.
     * @param quantity the quantity to be checked and reduced from stock.
     * @return the updated {@link Product} with reduced quantity.
     * @throws RuntimeException if the product is not found or there is not enough stock.
     */
    @Transactional
    Product checkProductAvailability(String productId, BigDecimal quantity);

    /**
     * Retrieves all products.
     *
     * @return a list of {@link ProductDto} representing all products.
     */
    List<ProductDto> getAllProducts();

    ProductDto getProductById(String productId);

}
