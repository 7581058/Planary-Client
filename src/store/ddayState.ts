import { atom, selector } from 'recoil'
import { currentUserToken } from './userState'

import { instance } from '@/api'

export const ddayState = atom({
  key: 'ddayState',
  default: {
    index: 0,
    title: '',
    date: '',
  },
})

export const currentDdayQuery = selector({
  key: 'currentDdayQuery',
  get: async ({ get }) => {
    const token = get(currentUserToken)
    try {
      const res = await instance.get('/api/dday', {
        headers: {
          Authorization: token,
        },
      })
      return res.data
    } catch (error) {
      console.error('Failed to fetch dday list:', error)
      return {}
    }
  },
})
