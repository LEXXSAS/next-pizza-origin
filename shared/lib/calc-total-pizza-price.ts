import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { Ingredient, ProductItem } from "@prisma/client";

/**
 * Функция для подсчета общей стоимости пиццы
 *
 * @param type - тип пиццы (1 - traditional, 2 - thin)
 * @param size - размер выбранной пиццы
 * @param items - список всех пицц
 * @param ingredients - список всех ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 * @returns number общая стоимость
 */

export const caclTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;

  const totalIngredientsPrice = ingredients.filter((ingredient) => selectedIngredients.has(ingredient.id)).reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice
}
