import { selector } from 'recoil'

import { getMyInfo } from '@/api'

export const currentUserQuery = selector({
  key: 'currentUserQuery',
  get: async () => {
    try {
      const res = await getMyInfo()
      return res
    } catch (error) {
      console.error('Failed to fetch my info:', error)
      throw error
    }
  },
})
