import { addDataGameSession, removeDataGameSession } from '../../src/store'

test('addDataGameSession', () => {
  expect(addDataGameSession('lobbyId', 'userId', 'nickname'))
})

test('removeDataGameSession', () => {
  expect(removeDataGameSession('lobbyId', 'userId'))
})
