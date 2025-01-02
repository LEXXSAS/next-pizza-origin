import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import * as React from 'react';

interface OrderSuccessTemplateProps {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccess: React.FC<OrderSuccessTemplateProps> = ({
  orderId,
  items
}) => (
  <div>
    <h1>Спасибо за покупку! 🎉</h1>

    <p>Ваш заказ #{orderId} оплачен. Список товаров:</p>

    <hr></hr>

    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productItem.product.name} | {item.productItem.price} ₽ x {item.quantity} шт. ={' '} {item.productItem.price * item.quantity} ₽
        </li>
      ))}
    </ul>
  </div>
);
