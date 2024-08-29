import { atom, selector } from 'recoil'

import { getDdayList } from '@/api'

export const currentDdayWidgetId = atom<number | null>({
  key: 'currentDdayWidgetId',
  default: null,
})

export const currentDdayQuery = selector({
  key: 'currentDdayQuery',
  get: async ({ get }) => {
    const widgetId = get(currentDdayWidgetId)
    if (widgetId === null) {
      return { ddayList: [], isAuto: false }
    }
    try {
      const res = await getDdayList(widgetId)
      return res || { ddayList: [], isAuto: false }
    } catch (error) {
      console.error('Failed to fetch dday list:', error)
      throw error
    }
  },
})
