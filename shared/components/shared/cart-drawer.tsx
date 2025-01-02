'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import React from 'react';
import Image from 'next/image';
import { Button } from '../ui';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemsDetails } from '@/shared/lib';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { useCart } from '@/shared/hooks';
import { DialogTitle } from '@radix-ui/react-dialog';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({children}) => {
  const {addCartItem, loading, items, totalAmount, updateItemQuantity, removeCartItem} = useCart();
  
  const [redirecting, setRedirecting] = React.useState(false);

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent aria-describedby={undefined} className={cn('flex flex-col justify-center pb-0 bg-[#F4F1EE]', !totalAmount && 'items-center')}>
      <div className={cn('flex flex-col', !totalAmount &&  'justify-center')}>
        {totalAmount > 0 ? (
          <SheetHeader>
            <SheetTitle>
              В корзине <span className="font-bold">{items.length} товара</span>
            </SheetTitle>
          </SheetHeader>
        ) : 
        (
            <div id="empty-cart" className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120} />
              <Title size="sm" text="Корзина пустая" className="text-center font-bold my-2" />
                <DialogTitle>
              <p className="text-center text-neutral-500 mb-5">
                Добавьте хотя бы одну пиццу, чтобы совершить заказ
              </p>
                </DialogTitle>
    
              <SheetClose asChild>
                <Button id='checkout-button-two' className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  <DialogTitle>
                  Вернуться назад
                  </DialogTitle>
                </Button>
              </SheetClose>
            </div>
            
        )
        }
      </div>

      {totalAmount > 0 && (
      <>
      <div className="-mx-6 mt-5 flex-1">
          <div className='mb-2'>
          {items.map((item) => (
            <CartDrawerItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              details={
                getCartItemsDetails(
                  item.ingredients,
                  item.pizzaType as PizzaType,
                  item.pizzaSize as PizzaSize
                )
              }
              onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
              onClickRemove={() => removeCartItem(item.id)}
            />
          ))}
          </div>
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
          <div className="flex mb-4">
            <span className="flex flex-1 text-lg text-neutral-500">
              Итого
              <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
            </span>
            <span className="font-bold text-lg">{totalAmount} ₽</span>
          </div>

          <Link href="/checkout">
            <Button
              type="submit"
              onClick={() => setRedirecting(true)}
              loading={redirecting}
              id='checkout-button-one'
              className="w-full h-12 text-base">
                <DialogTitle>
              Оформить заказ
                </DialogTitle>
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </Link>
          </div>
        </SheetFooter>
      </>
      )}
      </SheetContent>
    </Sheet>
  )
}
