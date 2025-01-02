import { Cart, Ingredient } from '@prisma/client';
import { PizzaType, PizzaSize, mapPizzaType } from './../constants/pizza';
import { CartStateItem } from './get-cart-details';
import { never } from 'zod';
export const getCartItemsDetails = (
  ingredients: CartStateItem['ingredients'],
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize,
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(', ');
}
