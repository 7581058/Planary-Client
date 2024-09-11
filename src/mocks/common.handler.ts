import { http, HttpResponse } from 'msw'
import { DefaultBodyType } from 'msw'
import { MSW_TEST_ACCOUNTS, MSW_TEST_TOKEN } from './constants'
import {
  RES_MY_RETRIEVED_SUCCESS,
  RES_USER_LOGIN_FAIL_INVAILD,
  RES_USER_LOGIN_FAIL_NO_USER,
  RES_USER_LOGIN_SUCCESS,
  RES_USER_REGIST_FAIL_REQUIRED,
  RES_USER_REGIST_SUCCESS,
} from './resMessage'
import { authenticateRequest } from './utils'

interface User {
  username: string
  email: string
  password: string
  birth: string
  agree: boolean
}

type LoginBody = DefaultBodyType & {
  email: string
  password: string
}
const members: User[] = []

export const commonHandlers = [
  // 회원가입 API
  http.post('/users/register', async ({ request }) => {
    const data = (await request.json()) as User

    if (!data.username || !data.email || !data.password || !data.birth || !data.agree) {
      return HttpResponse.json(RES_USER_REGIST_FAIL_REQUIRED.res, { status: RES_USER_REGIST_FAIL_REQUIRED.code })
    }

    members.push(data)

    return HttpResponse.json(RES_USER_REGIST_SUCCESS.res, { status: RES_USER_REGIST_SUCCESS.code })
  }),

  // 로그인 API
  http.post<never, LoginBody>('/users/login', async ({ request }) => {
    const { email, password } = (await request.json()) as LoginBody
    const user = [...MSW_TEST_ACCOUNTS, ...members].find((m) => m.email === email)

    if (!user) {
      return HttpResponse.json(RES_USER_LOGIN_FAIL_NO_USER.res, { status: RES_USER_LOGIN_FAIL_NO_USER.code })
    }

    if (user.password !== password) {
      return HttpResponse.json(RES_USER_LOGIN_FAIL_INVAILD.res, { status: RES_USER_LOGIN_FAIL_INVAILD.code })
    }

    return HttpResponse.json(
      { ...RES_USER_LOGIN_SUCCESS.res, token: MSW_TEST_TOKEN },
      { status: RES_USER_LOGIN_SUCCESS.code },
    )
  }),

  // 내정보 조회
  http.get('/users/my', async ({ request }) => {
    const authResponse = authenticateRequest(request)
    if (authResponse) return authResponse

    return HttpResponse.json(
      {
        ...RES_MY_RETRIEVED_SUCCESS.res,
        userId: MSW_TEST_ACCOUNTS[0].userId,
        email: MSW_TEST_ACCOUNTS[0].email,
        birth: MSW_TEST_ACCOUNTS[0].userId,
        name: MSW_TEST_ACCOUNTS[0].username,
      },
      {
        status: RES_MY_RETRIEVED_SUCCESS.code,
      },
    )
  }),
]
