import { addGameSession, removeGameSession } from '../../src/store'

test('addGameSession', () => {
  expect(
    addGameSession('lobbyId', {
      _id: '123123',
      email: 'test@test.ts',
      nickname: 'nioc',
      gameStats: { loses: 0, wins: 0, rate: 1000 },
      rang: 'Common',
    })
  )
})

test('removeGameSession', () => {
  expect(removeGameSession('lobbyId', 'userId'))
})
