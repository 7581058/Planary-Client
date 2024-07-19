import { atom, selector } from 'recoil'
import { currentUserToken } from './userState'

import { instance } from '@/api'

export const ddayState = atom({
  key: 'ddayState',
  default: {
    ddayList: [],
    isAuto: null,
  },
})

export const currentDdayWidgetId = atom<number | null>({
  key: 'currentDdayWidgetId',
  default: null,
})

export const currentDdayQuery = selector({
  key: 'currentDdayQuery',
  get: async ({ get }) => {
    const widgetId = get(currentDdayWidgetId)
    const token = get(currentUserToken)
    if (!token || widgetId === null) {
      return { ddayList: [], isAuto: null }
    }
    try {
      const res = await instance.get(`/dday/${widgetId}`, {
        headers: {
          Authorization: token,
        },
      })
      return res.data || { ddayList: [], isAuto: null }
    } catch (error) {
      console.error('Failed to fetch dday list:', error)
      return { ddayList: [], isAuto: null }
    }
  },
})
