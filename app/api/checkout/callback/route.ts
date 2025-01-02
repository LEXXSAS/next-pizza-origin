import { PaymentCallbackData } from "@/@types/yookassa";
import { prisma } from "@/prisma/prisma-client";
import { OrderSuccess } from "@/shared/components";
import { sendEmail } from "@/shared/lib";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id) 
      }
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const isSucceeded = body.object.status === 'succeeded';

    if (order && isSucceeded) {
      await prisma.order.update({
        where: {
          id: order.id
        },
        data: {
          status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED
        }
      });

      const items = JSON.parse(order?.items as string) as CartItemDTO[];
    
      if (isSucceeded) {
        await sendEmail(
          order.email,
          'Next Pizza - Ваш заказ оформлен! 🎉',
          OrderSuccess({ orderId: order.id, items })
        );
      }
      NextResponse.json({ message: 'Успешный заказ' });
    } else {
      NextResponse.json({ message: 'Ошибка заказа' });
    }

  } catch (error) {
    console.log('[Checkout Callback] Error', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
