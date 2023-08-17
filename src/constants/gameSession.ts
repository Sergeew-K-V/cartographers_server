import { IFieldCell } from '../types'

const GAME_POINTS_CARDS = {
  city: ['city_1.png', 'city_2.png', 'city_3.png', 'city_4.png'],
  wood: ['wood_1.png', 'wood_2.png', 'wood_3.png', 'wood_4.png'],
  fields: ['fields_1.png', 'fields_2.png', 'fields_3.png', 'fields_4.png'],
  form: ['form_1.png', 'form_2.png', 'form_3.png', 'form_4.png'],
}

const DECK_OF_CARDS = [
  'card_1.png',
  'card_2.png',
  'card_3.png',
  'card_4.png',
  'card_5.png',
  'card_6.png',
  'card_7.png',
  'card_8.png',
  'card_9.png',
  'card_10.png',
  'card_11.png',
  'card_12.png',
  'card_13.png',
]

const DECK_OF_ENEMY_CARDS = [
  'card_enemy_1.png',
  'card_enemy_2.png',
  'card_enemy_3.png',
  'card_enemy_4.png',
]

const GAME_FIELD: IFieldCell[][] = [
  [
    { id: 1, image: 'cell.png' },
    { id: 2, image: 'cell.png' },
    { id: 3, image: 'cell.png' },
    { id: 4, image: 'cell.png' },
    { id: 5, image: 'cell.png' },
    { id: 6, image: 'cell.png' },
    { id: 7, image: 'cell.png' },
    { id: 8, image: 'cell.png' },
    { id: 9, image: 'cell.png' },
    { id: 10, image: 'cell.png' },
    { id: 11, image: 'cell.png' },
  ],
  [
    { id: 1, image: 'cell.png' },
    { id: 2, image: 'cell.png' },
    { id: 3, image: 'cell.png' },
    { id: 4, image: 'mountain.png' },
    { id: 5, image: 'cell.png' },
    { id: 6, image: 'ruins.png' },
    { id: 7, image: 'cell.png' },
    { id: 8, image: 'cell.png' },
    { id: 9, image: 'cell.png' },
    { id: 10, image: 'cell.png' },
    { id: 11, image: 'cell.png' },
  ],
  [
    { id: 1, image: 'cell.png' },
    { id: 2, image: 'ruins.png' },
    { id: 3, image: 'cell.png' },
    { id: 4, image: 'cell.png' },
    { id: 5, image: 'cell.png' },
    { id: 6, image: 'cell.png' },
    { id: 7, image: 'cell.png' },
    { id: 8, image: 'cell.png' },
    { id: 9, image: 'mountain.png' },
    { id: 10, image: 'ruins.png' },
    { id: 11, image: 'cell.png' },
  ],
  [
    { id: 1, image: 'cell.png' },
    { id: 2, image: 'cell.png' },
    { id: 3, image: 'cell.png' },
    { id: 4, image: 'cell.png' },
    { id: 5, image: 'cell.png' },
    { id: 6, image: 'cell.png' },
    { id: 7, image: 'cell.png' },
    { id: 8, image: 'cell.png' },
    { id: 9, image: 'cell.png' },
    { id: 10, image: 'cell.png' },
    { id: 11, image: 'cell.png' },
  ],
  [
    { id: 1, image: 'cell.png' },
    { id: 2, image: 'cell.png' },
    { id: 3, image: 'cell.png' },
    { id: 4, image: 'cell.png' },
    { id: 5, image: 'cell.png' },
    { id: 6, image: 'cell.png' },
    { id: 7, image: 'cell.png' },
    { id: 8, image: 'cell.png' },
    { id: 9, image: 'cell.png' },
    { id: 10, image: 'cell.png' },
    { id: 11, image: 'cell.png' },
  ],
  [
    { id: 1, image: 'cell.png' },
    { id: 2, image: 'cell.png' },
    { id: 3, image: 'cell.png' },
    { id: 4, image: 'cell.png' },
    { id: 5, image: 'cell.png' },
    { id: 6, image: 'mountain.png' },
    { id: 7, image: 'cell.png' },
    { id: 8, image: 'cell.png' },
    { id: 9, image: 'cell.png' },
    { id: 10, image: 'cell.png' },
    { id: 11, image: 'cell.png' },
  ],
  [
    { id: 1, image: 'cell.png' },
    { id: 2, image: 'cell.png' },
    { id: 3, image: 'cell.png' },
    { id: 4, image: 'cell.png' },
    { id: 5, image: 'cell.png' },
    { id: 6, image: 'cell.png' },
    { id: 7, image: 'cell.png' },
    { id: 8, image: 'cell.png' },
    { id: 9, image: 'cell.png' },
    { id: 10, image: 'cell.png' },
    { id: 11, image: 'cell.png' },
  ],
  [
    { id: 1, image: 'cell.png' },
    { id: 2, image: 'cell.png' },
    { id: 3, image: 'cell.png' },
    { id: 4, image: 'cell.png' },
    { id: 5, image: 'cell.png' },
    { id: 6, image: 'cell.png' },
    { id: 7, image: 'cell.png' },
    { id: 8, image: 'cell.png' },
    { id: 9, image: 'cell.png' },
    { id: 10, image: 'cell.png' },
    { id: 11, image: 'cell.png' },
  ],
  [
    { id: 1, image: 'cell.png' },
    { id: 2, image: 'ruins.png' },
    { id: 3, image: 'mountain.png' },
    { id: 4, image: 'cell.png' },
    { id: 5, image: 'cell.png' },
    { id: 6, image: 'cell.png' },
    { id: 7, image: 'cell.png' },
    { id: 8, image: 'cell.png' },
    { id: 9, image: 'cell.png' },
    { id: 10, image: 'ruins.png' },
    { id: 11, image: 'cell.png' },
  ],
  [
    { id: 1, image: 'cell.png' },
    { id: 2, image: 'cell.png' },
    { id: 3, image: 'cell.png' },
    { id: 4, image: 'cell.png' },
    { id: 5, image: 'cell.png' },
    { id: 6, image: 'ruins.png' },
    { id: 7, image: 'cell.png' },
    { id: 8, image: 'mountain.png' },
    { id: 9, image: 'cell.png' },
    { id: 10, image: 'cell.png' },
    { id: 11, image: 'cell.png' },
  ],
  [
    { id: 1, image: 'cell.png' },
    { id: 2, image: 'cell.png' },
    { id: 3, image: 'cell.png' },
    { id: 4, image: 'cell.png' },
    { id: 5, image: 'cell.png' },
    { id: 6, image: 'cell.png' },
    { id: 7, image: 'cell.png' },
    { id: 8, image: 'cell.png' },
    { id: 9, image: 'cell.png' },
    { id: 10, image: 'cell.png' },
    { id: 11, image: 'cell.png' },
  ],
]

export { GAME_FIELD, GAME_POINTS_CARDS, DECK_OF_CARDS, DECK_OF_ENEMY_CARDS }
