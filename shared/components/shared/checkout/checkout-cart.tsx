'use client';

import { getCartItemsDetails } from "@/shared/lib";
import { CheckoutItem } from "../checkout-item";
import { WhiteBlock } from "../white-block";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { useEffect, useState } from "react";
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";

interface Props {
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({items, onClickCountButton, removeCartItem,className}) => {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setLoad(false);
  }, [])

  return (
    <WhiteBlock title="1. Корзина" className={className}>
    <div className="flex flex-col gap-5">
      {
        load && [...Array(2)].map((_, index) => <CheckoutItemSkeleton key={index}  />)
      }
      {items.map((item) => (
        <CheckoutItem
        key={item.id}
        id={item.id}
        imageUrl={item.imageUrl}
        details={
          getCartItemsDetails(
            item.ingredients,
            item.pizzaType as PizzaType,
            item.pizzaSize as PizzaSize
          )
        }
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        disabled={item.disabled}
        onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
        onClickRemove={() => removeCartItem(item.id)}
      />
      ))}
    </div>
  </WhiteBlock>
  )
}
