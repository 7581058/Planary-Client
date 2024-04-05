import { atom, selector } from 'recoil'

import { instance } from '@/api'

export const currentUserToken = atom({
  key: 'currentUserToken',
  default: localStorage.getItem('accessToken') || '',
})

export const currentUserInfoQuery = selector({
  key: 'currentUserInfoQuery',
  get: async ({ get }) => {
    const token = get(currentUserToken)
    if (!token) {
      return {}
    }

    try {
      const res = await instance.get('/api/myPage', {
        headers: {
          Authorization: token,
        },
      })
      return res.data
    } catch (error) {
      console.error('Failed to fetch user info:', error)
      return {}
    }
  },
})
