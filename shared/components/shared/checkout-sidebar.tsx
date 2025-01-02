'use client';

import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { CheckoutItemDetails } from "./checkout-item-details";
import { WhiteBlock } from "./white-block";
import { Button, Skeleton } from "../ui";
import { cn } from "@/shared/lib/utils";
import { useEffect, useState } from "react";

const VAT = 15;
const DELIVERY_PRICE = 250;

interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({loading, totalAmount, className}) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;

  const [load, setLoad] = useState(true);
  useEffect(() => {
    setLoad(false);
  }, [])
  
  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
    <div className="flex flex-col gap-1">
      <span className="text-xl">Итого:</span>
      {load ? <Skeleton className="h-11 w-48" /> : <span className="h-11 text-[34px] font-extrabold">{totalPrice} ₽</span>}
    </div>

  <CheckoutItemDetails title={
    <div className="flex items-center">
    <Package size={18} className="mr-2 text-gray-400" />
    Стоимость товаров:
    </div>
  } value={load ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${totalAmount} ₽`} />
  <CheckoutItemDetails title={
    <div className="flex items-center">
    <Percent size={18} className="mr-2 text-gray-400" />
    Налоги:
    </div>
  } value={load ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${vatPrice} ₽`} />
  <CheckoutItemDetails title={
    <div className="flex items-center">
    <Truck size={18} className="mr-2 text-gray-400" />
    Доставка:
    </div>
  } value={load ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${DELIVERY_PRICE} ₽`} />

  <Button loading={loading} type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold" >
    Перейти к оплате
    <ArrowRight className="w-5 ml-2" />
  </Button>
  </WhiteBlock>
  )
}
