import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib";

interface MainArr {
  id: number
  cartId: number,
  productItemId: number,
  quantity: number,
  createdAt: Date,
  updatedAt: Date,
  ingredients: number[]
}
function isEqual(array1: any, array2: any) {
  return JSON.stringify(array1) === JSON.stringify(array2);
}
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
    
    const other = await prisma.cartItem.findMany({
      include: {
        ingredients: true,
      }, where: {
        productItemId: data.productId,
      }
    });

    console.log('other =>', other);

    if (other.length === 0) {
    console.log('other.length будет создан новый товар')
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
      let fromDb: MainArr[] = [];
      let exists = other.some((item) => item.ingredients.length === 0 && data.ingredients?.length === 0);
      other.forEach(async (item) => {
        if (item.ingredients.length === 0 && data.ingredients?.length === 0) {
          console.log(`other.forEach товар #${item.id} будет обновлен`)
          await prisma.cartItem.update({
            where: {
              id: item.id
            },
            data: {
              quantity: item.quantity + 1
            }
          });
        } else if (data.ingredients?.length && item.ingredients.length === 0 && data.ingredients?.length > 0 && exists) {
          console.log('else if будет создан новый товар')
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
        }
        else {
          console.log('else будет проверено на ингредиенты')
          fromDb.push({...item, ingredients: item.ingredients.map((ing) => ing.id)});
        }
      });
      const dataIng = data.ingredients;

      let arr: number[][] = []
      fromDb.forEach(async (item) => {
        arr.push(item.ingredients)
      });
      if (arr.length > 0 && arr.some((item) => isEqual(item, dataIng))) {
        console.log('some true => товар будет обновлен')
        fromDb.forEach(async (item) => {
          const isEqualTest = isEqual(item.ingredients, dataIng)
          if (isEqualTest) {
            await prisma.cartItem.update({
              where: {
                id: item.id
              },
              data: {
                quantity: item.quantity + 1
              }
            });
          } else {
            // console.log('isEqualTest false')
          }
        })
      } else if (data.ingredients && data.ingredients?.length > 0) {
        console.log('some false => будет создан новый товар')
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
      }
    }

    console.log('data => ', data);
    const updatedUserCart = await updateCartTotalAmount(token);
    const resp = NextResponse.json(updatedUserCart);
    return resp;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({message: 'Не удалось создать корзину'}, {status: 500});
  }
}
