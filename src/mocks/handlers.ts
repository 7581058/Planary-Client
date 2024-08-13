import { http, HttpResponse } from 'msw'
import { DefaultBodyType } from 'msw'
import { MSW_DASHBOARD_LAYOUTS, MSW_TEST_ACCOUNTS, MSW_TEST_TOKEN } from './constants'
import { ddayData } from './ddayData'
import {
  RES_DASHBOARD_ID_FAIL_INVALID,
  RES_DASHBOARD_LIST_RETRIEVED_SUCCESS,
  RES_DASHBOARD_LIST_RETRIEVED_SUCCESS_EMPTY,
  RES_DASHBOARD_RETRIEVED_SUCCESS,
  RES_DASHBOARD_RETRIEVED_SUCCESS_EMPTY,
  RES_INTERNAL_SERVER_ERROR,
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

export const handlers = [
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

  //대시보드 목록 조회
  http.get('/dashboard/list', async ({ request }) => {
    const authResponse = authenticateRequest(request)
    if (authResponse) return authResponse

    const url = new URL(request.url)
    const testCase = url.searchParams.get('testCase')

    switch (testCase) {
      case 'empty':
        return HttpResponse.json(
          {
            ...RES_DASHBOARD_LIST_RETRIEVED_SUCCESS_EMPTY.res,
            boardList: [],
          },
          { status: RES_DASHBOARD_LIST_RETRIEVED_SUCCESS_EMPTY.code },
        )

      case 'error':
        return HttpResponse.json(RES_INTERNAL_SERVER_ERROR.res, {
          status: RES_INTERNAL_SERVER_ERROR.code,
        })

      default:
        return HttpResponse.json(
          {
            ...RES_DASHBOARD_LIST_RETRIEVED_SUCCESS.res,
            boardList: [
              { title: 'myboard', theme: 'default', id: 1 },
              { title: 'myboard2', theme: 'default', id: 2 },
            ],
          },
          { status: RES_DASHBOARD_LIST_RETRIEVED_SUCCESS.code },
        )
    }
  }),

  //대시보드 아이디로 해당 대시보드 전체 위젯 조회
  http.get('/dashboard/:boardId', async ({ request, params }) => {
    const authResponse = authenticateRequest(request)
    if (authResponse) return authResponse

    const boardId = Number(params.boardId)
    const layoutData = MSW_DASHBOARD_LAYOUTS[boardId]

    if (layoutData === undefined) {
      return HttpResponse.json(RES_DASHBOARD_ID_FAIL_INVALID.res, { status: RES_DASHBOARD_ID_FAIL_INVALID.code })
    }

    const url = new URL(request.url)
    const testCase = url.searchParams.get('testCase')

    switch (testCase) {
      case 'empty':
        return HttpResponse.json(
          {
            ...RES_DASHBOARD_RETRIEVED_SUCCESS_EMPTY.res,
            lg: [],
          },
          { status: RES_DASHBOARD_RETRIEVED_SUCCESS_EMPTY.code },
        )

      case 'error':
        return HttpResponse.json(RES_INTERNAL_SERVER_ERROR.res, {
          status: RES_INTERNAL_SERVER_ERROR.code,
        })

      default:
        return HttpResponse.json(
          {
            ...RES_DASHBOARD_RETRIEVED_SUCCESS.res,
            lg: layoutData,
          },
          {
            status: RES_DASHBOARD_RETRIEVED_SUCCESS.code,
          },
        )
    }
  }),

  //대시보드 수정
  /* http.post('/api/board/:boardId', async ({ request, params }) => {
    const token = request.headers.get('Authorization')
    const { boardId } = params

    const result = await request.json()

    const data = {
      success: true,
    }

    if (token === '12341234' && boardId && result) {
      return new HttpResponse(JSON.stringify(data), {
        status: 200,
      })
    } else {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'failed',
      })
    }
  }), */

  //디데이 조회
  /*  http.get('/api/dday', async ({ request }) => {
    const token = request.headers.get('Authorization')
    if (token === '12341234') {
      return new HttpResponse(JSON.stringify(ddayData), {
        status: 200,
      })
    } else {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'authentication_failed',
      })
    }
  }), */
  //디데이 추가
  //디데이 수정
  //디데이 삭제
]

// 내 정보 조회 (프로필, 마이페이지에서 사용)
/* http.get('/api/myPage', async ({ request }) => {
  const data = {
    email: 'admin@planary.com',
    name: '플랜어리관리자',
    profile_image_url: '/src/assets/default_profile.svg',
    title: '👑관리자👑',
  }

  const token = request.headers.get('Authorization')

  if (token === '12341234') {
    return new HttpResponse(JSON.stringify(data), {
      status: 200,
    })
  } else {
    return new HttpResponse(null, {
      status: 400,
      statusText: 'authentication_failed',
    })
  }
}), */
