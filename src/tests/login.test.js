import { http, HttpResponse } from 'msw'
import { describe, expect, test } from 'vitest'
import { mswSetupServer } from '../mocks/server'

describe('로그인 테스트', () => {
  test('정상 로그인', async () => {
    const response = await fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'admin@planary.com', password: '1q2w3e4r#' }),
    })
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('accessToken')
    expect(data).toHaveProperty('refreshToken')
  })

  test('이메일 형식 검증', async () => {
    const response = await fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'notanemail', password: '1q2w3e4r#' }),
    })
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe('authentication_failed')
    //expect(response.statusText).toMatch(/authentication.*failed/i)
    //expect(response.statusText.toLowerCase()).toContain('authentication')
  })

  test('로그인 실패', async () => {
    const response = await fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'wrong@email.com', password: 'wrongpass' }),
    })
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe('authentication_failed')
  })

  test('네트워크 에러', async () => {
    mswSetupServer.use(
      http.post('/users/login', () => {
        return HttpResponse.error()
      }),
    )
    await expect(
      fetch('/users/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'admin@planary.com', password: '1q2w3e4r' }),
      }),
    ).rejects.toThrow()
  })

  test('응답 지연', async () => {
    mswSetupServer.use(
      http.post('/users/login', async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000))
        return HttpResponse.json({ accessToken: '12341234', refreshToken: '1234' })
      }),
    )
    const startTime = Date.now()
    await fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'admin@planary.com', password: '1q2w3e4r' }),
    })
    const endTime = Date.now()
    expect(endTime - startTime).toBeGreaterThanOrEqual(3000)
  })
})
