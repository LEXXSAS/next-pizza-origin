import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const {id} = params;
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({message: 'Токен корзины не найден' }, {status: 401});
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' });
    }

    await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: data.quantity,
      },
    });
    
    const updateUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updateUserCart);
  } catch (error) {
    console.log('[CART_PATCH] Server error', error)
    return NextResponse.json({message: 'Не удалось обновить корзину' }, {status: 500});
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const {id} = params;
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({message: 'Токен корзины не найден' }, {status: 401});
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(id),
      }
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' });
    }

    await prisma.cartItem.delete({
      where: {
        id: cartItem.id,
      }
    });

    const updateUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updateUserCart);
  } catch (error) {
    console.log('[CART_DELETE] Server error', error)
    return NextResponse.json({message: 'Не удалось обновить корзину' }, {status: 500});
  }
}
