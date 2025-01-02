'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, FormProvider} from 'react-hook-form';
import { useCart } from "@/shared/hooks";
import {
  CheckoutSidebar,
  Container,
  Title,
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm
} from '@/shared/components';
import { checkoutFormSchema, CheckoutFormValues } from '@/shared/constants';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import React from 'react';
import { Api } from '@/shared/services/api-client';

export default function Checkout() {
  const [submitting, setSubmitting] = useState(false);
  const {loading,items, totalAmount, updateItemQuantity, removeCartItem} = useCart();
  const {data: session} = useSession();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: ''
    }
  });

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(' ');
      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session])

  const onSubmit: SubmitHandler<CheckoutFormValues> = async(data) => {
    try {
      setSubmitting(true);
      
      const url = await createOrder(data);

      toast.success('Заказ успешно создан. Переход на страницу оплаты...', {
        icon: '✅'
      });

      if(url) {
        location.href = url;
      }

    } catch (error) {
      console.log(error);
      setSubmitting(false);
      toast.error('Не удалось создать заказ', {
        icon: '❌'
      });
    }
  }

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  }

  return (
  <Container className="mt-10">
  <Title text="Оформление заказа" size="xl" className="font-extrabold mb-8 text-[36px]" />

  <FormProvider {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">

          <CheckoutCart
            onClickCountButton={onClickCountButton}
            removeCartItem={removeCartItem}
            items={items}
            loading={loading}
          />

          <CheckoutPersonalForm />

          <CheckoutAddressForm  />
        </div>

        {/* Правая часть */}
        <div className="w-[450px]">
          <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
        </div>
      </div>
  </form>
  </FormProvider>
  </Container>
  );
}
