import { http } from 'msw'
import { passthrough } from 'msw'

export const passthroughHandlers = [
  http.get('*.svg', () => passthrough()),
  http.get('/src/components', () => passthrough()),
  http.get('/src/assets/*', () => passthrough()),
]
