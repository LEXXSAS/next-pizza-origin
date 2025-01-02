'use client'

import { cn } from "@/shared/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { ProductWithRelations } from "@/@types/prisma";
import { ProductForm } from "../product-form";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        id="choose-product-modal"
        aria-describedby={undefined}
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
          <DialogTitle>
            <ProductForm product={product} onSubmit={() => router.back()} />
          </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};
