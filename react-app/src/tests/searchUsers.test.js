import { describe, it, expect } from 'vitest'
import { searchUsers } from '../utils/searchUsers'

describe('searchUsers', () => {
  it('encuentra un usuario por su nombre', () => {
    const users = [
      { id: 1, name: 'Leanne Graham' },
      { id: 2, name: 'Ervin Howell' }
    ]

    const result = searchUsers(users, 'leanne')

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Leanne Graham')
  })
})
