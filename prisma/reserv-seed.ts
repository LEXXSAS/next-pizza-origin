import { PrismaClient, Prisma } from '@prisma/client';
import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';
import { categories, ingredients, products } from './constans';

const randoNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randoNumber(190, 600),
    pizzaType,
    size
  } as Prisma.ProductItemUncheckedCreateInput;
}

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User Test',
        email: 'user@test.ru',
        password: hashSync('123', 10),
        verified: new Date(),
        role: 'USER'
      },
      {
        fullName: 'Admin Admin',
        email: 'admin@test.ru',
        password: hashSync('123', 10),
        verified: new Date(),
        role: 'ADMIN'
      }
    ]
  });

  await prisma.category.createMany({
    data: categories,
  })

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Пепперони фреш',
      imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5)
      },
    }
  })

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Двойной цыпленок',
      imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D614CBE0530B7234B6D7A6E5F8E.avif',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10)
      },
    }
  })

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Ветчина и сыр',
      imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D60FDA22358AC33C6A44EB093A2.avif',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40)
      },
    }
  })

  await prisma.productItem.createMany({
    data: [
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20}),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30}),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40}),

      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20}),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30}),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40}),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20}),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30}),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40}),

      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20}),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30}),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40}),

      generateProductItem({ productId: 1}),
      generateProductItem({ productId: 2}),
      generateProductItem({ productId: 3}),
      generateProductItem({ productId: 4}),
      generateProductItem({ productId: 5}),
      generateProductItem({ productId: 6}),
      generateProductItem({ productId: 7}),
      generateProductItem({ productId: 8}),
      generateProductItem({ productId: 9}),
      generateProductItem({ productId: 10}),
      generateProductItem({ productId: 11}),
      generateProductItem({ productId: 12}),
      generateProductItem({ productId: 13}),
      generateProductItem({ productId: 14}),
      generateProductItem({ productId: 15}),
      generateProductItem({ productId: 16}),
      generateProductItem({ productId: 17}),
    ]
  })

}
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
}
async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

main().then(async () => {
  await prisma.$disconnect();
})
.catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
