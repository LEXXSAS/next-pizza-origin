'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from './container';
import Image from 'next/image';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals';
import { useRouter } from 'next/navigation';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({hasCart = true, hasSearch = true,className}) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  
  const searchParams = useSearchParams();

  React.useEffect(() => {
    let toastMessage = '';

    if (searchParams.get('paid')) {
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.'
    }

    if (searchParams.get('verified')) {
      toastMessage = 'Почта успешно подтверждена!'
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 2000
        })
      }, 500)
    }
  }, []);

  return (
    <header className={cn('border-b', className)}>
      <Container id='header-container' className='flex items-center justify-between py-12'>
        {/* Левая часть */}
        <a href='/'>
        <div className='flex items-center gap-4'>
          <Image src='/logo.png' width={35} height={35} alt='logo' />
          <div>
            <h1 id='logo-font' className='text-2xl uppercase font-black'>Next Pizza</h1>
            <p id='logo-font-sub' className='text-sm text-gray-400 leading-3'>вкусней уже некуда</p>
          </div>
        </div>
        </a>

        {hasSearch && <div className='mx-10 flex-1'>
          <SearchInput />
        </div>}

        {/* Правая часть */}
        <div className='flex items-center gap-3'>
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          <div>
            {hasCart && <CartButton />}
          </div>
        </div>
      </Container>
    </header>
  );
}
