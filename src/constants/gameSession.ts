import { IGameCard, IGameFieldMatrix } from '../types'

const GAME_POINTS_CARDS = {
  city: ['city_1.png', 'city_2.png', 'city_3.png', 'city_4.png'],
  wood: ['wood_1.png', 'wood_2.png', 'wood_3.png', 'wood_4.png'],
  fields: ['fields_1.png', 'fields_2.png', 'fields_3.png', 'fields_4.png'],
  form: ['form_1.png', 'form_2.png', 'form_3.png', 'form_4.png'],
}

const DECK_OF_CARDS: IGameCard[] = [
  {
    id: 'card_1.png',
    img: 'card_1.png',
    name: 'Великая река',
    cost: 1,
    type: ['water'],
    matrix: [
      [0, 0, 1],
      [0, 1, 1],
      [1, 1, 0],
    ],
    coinsMatrix: [[1], [1], [1]],
  },
  // {
  //   id: 'card_2.png',
  //   img: 'card_2.png',
  //   name: 'Руины храма',
  //   cost: 0,
  //   type: ['ruins'],
  //   matrix: [],
  // },
  {
    id: 'card_3.png',
    img: 'card_3.png',
    name: 'Забытый лес',
    cost: 1,
    type: ['wood'],
    matrix: [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    coinsMatrix: [
      [1, 0],
      [0, 1],
    ],
  },
  {
    id: 'card_4.png',
    img: 'card_4.png',
    name: 'Городок',
    cost: 1,
    type: ['city'],
    matrix: [
      [1, 1, 1],
      [1, 1, 0],
    ],
    coinsMatrix: [
      [1, 0],
      [1, 1],
    ],
  },
  {
    id: 'card_5.png',
    img: 'card_5.png',
    name: 'Болото',
    cost: 2,
    type: ['water', 'wood'],
    matrix: [
      [1, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
  },
  {
    id: 'card_6.png',
    img: 'card_6.png',
    name: 'Сад',
    cost: 2,
    type: ['wood', 'ground'],
    matrix: [
      [1, 1, 1],
      [0, 0, 1],
    ],
  },
  {
    id: 'card_7.png',
    img: 'card_7.png',
    name: 'Рыбацкая деревня',
    cost: 2,
    type: ['city', 'water'],
    matrix: [[1, 1, 1, 1]],
  },
  {
    id: 'card_8.png',
    img: 'card_8.png',
    name: 'Река в полях',
    cost: 2,
    type: ['ground', 'water'],
    matrix: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 0],
    ],
  },
  {
    id: 'card_9.png',
    img: 'card_9.png',
    name: 'Хутор',
    cost: 2,
    type: ['city', 'ground'],
    matrix: [
      [1, 0],
      [1, 1],
      [1, 0],
    ],
  },
  {
    id: 'card_10.png',
    img: 'card_10.png',
    name: 'Лесные хижины',
    cost: 2,
    type: ['wood', 'city'],
    matrix: [
      [0, 0, 1, 1],
      [1, 1, 1, 0],
    ],
  },
  {
    id: 'card_11.png',
    img: 'card_11.png',
    name: 'Аномалия',
    cost: 0,
    type: ['wood', 'city', 'enemy', 'water', 'ground'],
    matrix: [[1]],
  },
  // {
  //   id: 'card_12.png',
  //   img: 'card_12.png',
  //   name: 'Руины форта',
  //   cost: 0,
  //   type: ['ruins'],
  //   matrix: [],
  // },
  {
    id: 'card_13.png',
    img: 'card_13.png',
    name: 'Угодья',
    cost: 1,
    type: ['ground'],
    matrix: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    coinsMatrix: [[1], [1]],
  },
]

const DECK_OF_ENEMY_CARDS: IGameCard[] = [
  {
    id: 'card_enemy_1.png',
    img: 'card_enemy_1.png',
    name: 'Набег гноллов',
    cost: 0,
    type: ['enemy'],
    matrix: [
      [1, 1],
      [1, 0],
      [1, 1],
    ],
  },
  {
    id: 'card_enemy_2.png',
    img: 'card_enemy_2.png',
    name: 'Натиск багберов',
    cost: 0,
    type: ['enemy'],
    matrix: [
      [1, 0, 1],
      [1, 0, 1],
    ],
  },
  {
    id: 'card_enemy_3.png',
    img: 'card_enemy_3.png',
    name: 'Атака гоблинов',
    cost: 0,
    type: ['enemy'],
    matrix: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
  },
  {
    id: 'card_enemy_4.png',
    img: 'card_enemy_4.png',
    name: 'Рейд кобольдов',
    cost: 0,
    type: ['enemy'],
    matrix: [
      [1, 0],
      [1, 1],
      [1, 0],
    ],
  },
]

const GAME_FIELD: IGameFieldMatrix = [
  [
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
  ],
  [
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'mountain', value: 1 },
    { type: 'cell', value: 0 },
    { type: 'ruins', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
  ],
  [
    { type: 'cell', value: 0 },
    { type: 'ruins', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'mountain', value: 1 },
    { type: 'ruins', value: 0 },
    { type: 'cell', value: 0 },
  ],
  [
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
  ],
  [
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
  ],
  [
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'mountain', value: 1 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
  ],
  [
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
  ],
  [
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
  ],
  [
    { type: 'cell', value: 0 },
    { type: 'ruins', value: 0 },
    { type: 'mountain', value: 1 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'ruins', value: 0 },
    { type: 'cell', value: 0 },
  ],
  [
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'ruins', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'mountain', value: 1 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
  ],
  [
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
    { type: 'cell', value: 0 },
  ],
]

export { GAME_FIELD, GAME_POINTS_CARDS, DECK_OF_CARDS, DECK_OF_ENEMY_CARDS }
