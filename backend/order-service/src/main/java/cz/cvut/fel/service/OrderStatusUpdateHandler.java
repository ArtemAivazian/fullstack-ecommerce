package cz.cvut.fel.service;

import cz.cvut.fel.dto.OrderRequestDto;
import cz.cvut.fel.entity.PurchaseOrder;
import cz.cvut.fel.repository.OrderRepository;
import cz.cvut.fel.status.OrderStatus;
import cz.cvut.fel.status.PaymentStatus;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

@Component
@AllArgsConstructor
public class OrderStatusUpdateHandler {

    private OrderRepository orderRepository;

    private OrderStatusPublisher orderStatusPublisher;

    @Transactional
    public void updateOrder(int id, Consumer<PurchaseOrder> consumer) {
        orderRepository.findById(id)
                .ifPresent(consumer.andThen(this::updateOrder));
    }

    private void updateOrder(PurchaseOrder purchaseOrder) {
        boolean isPaymentComplete = PaymentStatus.PAYMENT_COMPLETED.equals(purchaseOrder.getPaymentStatus());
        OrderStatus orderStatus = isPaymentComplete ? OrderStatus.ORDER_COMPLETED : OrderStatus.ORDER_CANCELLED;
        purchaseOrder.setOrderStatus(orderStatus);
        if (!isPaymentComplete) {
            orderStatusPublisher.publishOrderEvent(convertEntityToDto(purchaseOrder), orderStatus);
        }
    }

    private OrderRequestDto convertEntityToDto(PurchaseOrder purchaseOrder) {
        OrderRequestDto orderRequestDto = new OrderRequestDto();
        orderRequestDto.setOrderId(purchaseOrder.getId());
        orderRequestDto.setUserId(purchaseOrder.getUserId());
        orderRequestDto.setAmount(purchaseOrder.getPrice());
        orderRequestDto.setProductId(purchaseOrder.getProductId());
        return orderRequestDto;
    }
}
