export const categories = [
  {
    name: 'Пиццы',
  },
  {
    name: 'Завтрак',
  },
  {
    name: 'Закуски',
  },
  {
    name: 'Коктейли',
  },
  {
    name: 'Напитки',
  }
];

export const ingredients = [
  {
    name: 'Сырный бортик',
    price: 179,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
  },
  {
    name: 'Сливочная моцарелла',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
  },
  {
    name: 'Сыры чеддер и пармезан',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
  },
  {
    name: 'Острый перец халапеньо',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
  },
  {
    name: 'Нежный цыпленок',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
  },
  {
    name: 'Шампиньоны',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
  },
  {
    name: 'Бекон',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F',
  },
  {
    name: 'Ветчина',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
  },
  {
    name: 'Пикантная пепперони',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
  },
  {
    name: 'Острая чоризо',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
  },
  {
    name: 'Маринованные огурчики',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
  },
  {
    name: 'Свежие томаты',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
  },
  {
    name: 'Красный лук',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
  },
  {
    name: 'Сочные ананасы',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
  },
  {
    name: 'Итальянские травы',
    price: 39,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
  },
  {
    name: 'Сладкий перец',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
  },
  {
    name: 'Кубики брынзы',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
  },
  {
    name: 'Митболы',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
  }
].map((obj, index) => ({id: index + 1, ...obj}));

export const products = [
  {
    name: 'Кофе Карамельный капучино',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.avif',
    categoryId: 2
  },
  {
    name: 'Сырники со сгущенным молоком',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EF90613992FBC69C3DD4772681C783.avif',
    categoryId: 2
  },
  {
    name: 'Додстер с ветчиной',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7970259D888E98B6407EE6B994D9.avif',
    categoryId: 2
  },
  {
    name: 'Кофе Американо',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.avif',
    categoryId: 2
  },
  {
    name: 'Эклеры-мини с заварным кремом',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EF8C972951D9A193B3F3901197B8DA.avif',
    categoryId: 3
  },
  {
    name: 'Маффин Соленая карамель',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE79700C2EA0539D556CCF3DA1FEB7.avif',
    categoryId: 3
  },
  {
    name: 'Супермясной Додстер',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE797022F9AD72AC34E1B01DC6AEBA.avif',
    categoryId: 4
  },
  {
    name: 'Сырный Стартер',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EFA1F4AB2244098A783EAAB4691E53.avif',
    categoryId: 4
  },
  {
    name: 'Картофель из печи',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EED646B7AC9C38BA256320DD31C4D5.avif',
    categoryId: 5
  },
  {
    name: 'Куриные кусочки',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B9521D369D61228456C8F6C9.avif',
    categoryId: 5
  }
]
