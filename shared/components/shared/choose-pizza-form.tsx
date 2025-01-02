'use client';

import { cn } from "@/shared/lib/utils";
import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import React from "react";
import { IngredientItem } from "./ingredient-item";
import { useSet } from "react-use";
import { caclTotalPizzaPrice } from "@/shared/lib";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onClickAddCart?: VoidFunction;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className
}) => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngredient }] = useSet<number>(new Set([]));

  const totalPrice = caclTotalPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );
  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

  const filteredPizzasByType = items.filter((item) => item.pizzaType === type);
  const availablePizzaSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value)),
  }));

  const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

  React.useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find((item) => Number(item.value) === size && !item.disabled);
    const availableSize = availablePizzaSizes?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div id="pizza-form-container" className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div id="pizza-form" className="w-[490px] bg-[#F7F6F5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4">
        <GroupVariants items={availablePizzaSizes} value={String(size)} onClick={value => setSize(Number(value) as PizzaSize)} />

        <GroupVariants items={pizzaTypes} value={String(type)} onClick={value => setType(Number(value) as PizzaType)} />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div id="ingredients-item-container" className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}
