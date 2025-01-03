import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({totalAmount: 0,items: []});
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token
          }
        ]
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc'
          },
          include: {
            productItem: {
              include: {
                product: true
              }
            },
            ingredients: true
          }
        }
      }
    })

    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({message: 'Ошибка получения данных корзины'}, {status: 500});
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const data = (await req.json()) as CreateCartItemValues;
    
    const userCart = await findOrCreateCart(token);

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productId,
        ingredients:  {
          every: {
            id: {
              in: data.ingredients
            }
          }
        }
      }
    });

    if (!findCartItem) {
    await prisma.cartItem.create({
      data: {
        cartId: userCart.id,
        productItemId: data.productId,
        quantity: 1,
        ingredients: {
          connect: data.ingredients?.map((id) => ({id}))
        }
      }
    });
    } else {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id
        },
        data: {
          quantity: findCartItem.quantity + 1
        }
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);
    const resp = NextResponse.json(updatedUserCart);
    return resp;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({message: 'Не удалось создать корзину'}, {status: 500});
  }
}
