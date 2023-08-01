import {
  removeLobbyByLobbyId,
  findLobbyByLobbyId,
  findLobbyByUserId,
  addLobbyToLobbyList,
  getLobbyList,
  setLobbyList,
} from '../../src/store'
import { ILobby, IUser } from '../../src/types'

const lobby1: ILobby = {
  host: 'host',
  id: '1',
  isStarted: false,
  name: 'name',
  userList: [],
}

const lobby2: ILobby = {
  host: 'host',
  id: '1',
  isStarted: false,
  name: 'name',
  userList: [
    {
      email: 'test@test.ts',
      nickname: 'user1',
      _id: 'user1id',
      gameStats: { loses: 0, wins: 0, rate: 1000 },
      rang: 'Common',
    },
    {
      email: 'test2@test.ts',
      nickname: 'user2',
      _id: 'user2id',
      gameStats: { loses: 0, wins: 0, rate: 1000 },
      rang: 'Common',
    },
  ],
}

const currentUser: IUser = {
  email: 'test2@test.ts',
  nickname: 'user2',
  _id: 'user2id',
  gameStats: { loses: 0, wins: 0, rate: 1000 },
  rang: 'Common',
}

const lobbyList: ILobby[] = [lobby1, lobby2]

test('removeLobbyByLobbyId', () => {
  expect(removeLobbyByLobbyId(lobbyList, lobby1))
})

test('findLobbyByLobbyId', () => {
  expect(findLobbyByLobbyId(lobbyList, lobby1.id))
})

test('findLobbyByUserId', () => {
  expect(findLobbyByUserId(lobbyList, currentUser._id))
})

test('addLobbyToLobbyList', () => {
  expect(addLobbyToLobbyList(lobby2))
})

test('getLobbyList', () => {
  expect(getLobbyList())
})

test('setLobbyList', () => {
  expect(setLobbyList(lobbyList))
})
