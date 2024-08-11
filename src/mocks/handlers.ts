import { http, HttpResponse, passthrough } from 'msw'
import { DefaultBodyType } from 'msw'
import {
  RES_INTERNAL_SERVER_ERROR,
  RES_USER_LOGIN_FAIL_INVAILD,
  RES_USER_LOGIN_FAIL_NO_USER,
  RES_USER_LOGIN_SUCCESS,
  RES_USER_REGIST_FAIL_REQUIRED,
  RES_USER_REGIST_SUCCESS,
} from './constant'
import { layoutData, layoutData2 } from './data'
import { ddayData } from './ddayData'

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

const testAccounts = [
  { username: 'test', email: 'test@planary.com', password: '1q2w3e4r#', birth: '1995-05-05', agree: true },
]

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
    const user = [...testAccounts, ...members].find((m) => m.email === email)

    if (!user) {
      return HttpResponse.json(RES_USER_LOGIN_FAIL_NO_USER.res, { status: RES_USER_LOGIN_FAIL_NO_USER.code })
    }

    if (user.password !== password) {
      return HttpResponse.json(RES_USER_LOGIN_FAIL_INVAILD.res, { status: RES_USER_LOGIN_FAIL_INVAILD.code })
    }

    return HttpResponse.json(RES_USER_LOGIN_SUCCESS.res, { status: RES_USER_LOGIN_SUCCESS.code })
  }),

  // 내 정보 조회 (프로필, 마이페이지에서 사용)
  http.get('/api/myPage', async ({ request }) => {
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
  }),

  //대시보드 리스트
  http.get('/dashboard/list', async ({ request }) => {
    const data = {
      boards: [
        {
          title: 'myboard',
          index: 0,
        },
        {
          title: 'board2',
          index: 1,
        },
      ],
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
  }),

  //대시보드
  http.get('/dashboard/:boardId', async ({ request, params }) => {
    const token = request.headers.get('Authorization')
    const { boardId } = params
    if (token === '12341234' && boardId === '0') {
      return new HttpResponse(JSON.stringify(layoutData), {
        status: 200,
      })
    } else if (token === '12341234' && boardId === '1') {
      return new HttpResponse(JSON.stringify(layoutData2), {
        status: 200,
      })
    } else {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'authentication_failed',
      })
    }
  }),

  http.get('*.svg', () => passthrough()),
  http.get('/board', () => passthrough()),
  http.get('/src/assets/*', () => passthrough()),

  //대시보드 저장
  http.post('/api/board/:boardId', async ({ request, params }) => {
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
  }),

  //디데이 조회
  http.get('/api/dday', async ({ request }) => {
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
  }),
  //디데이 추가
  //디데이 수정
  //디데이 삭제
]
