'use client';

import React from 'react';
import { Title } from './title';
import { ProductCard } from './product-card';
import { cn } from '@/shared/lib/utils';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/shared/store/category';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({ categoryId, listClassName, title, items, className }) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  // @ts-ignore
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div id='products-group-list-container' className={cn('grid grid-cols-3 gap-[50px]', className)}>
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            count={i % 2}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
