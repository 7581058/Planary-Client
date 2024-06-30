import { http, HttpResponse, passthrough } from 'msw'
import { DefaultBodyType } from 'msw'
import { layoutData, layoutData2 } from './data'
import { ddayData } from './ddayData'

type ExtendedBodyType = DefaultBodyType & {
  email: string
  password: string
}

const members = []

export const handlers = [
  // 회원가입 API
  http.post('/api/signup', async ({ request }) => {
    const data = await request.json()

    members.push(data)

    const res = {
      success: true,
    }

    return new HttpResponse(JSON.stringify(res), { status: 200 })
  }),

  // 로그인 API
  http.post('/api/login', async ({ request }) => {
    const data = {
      accessToken: '12341234',
      refreshToken: '1234',
    }

    const result = (await request.json()) as ExtendedBodyType

    const email = result?.email
    const password = result?.password

    if (email === 'admin@planary.com' && password === '1q2w3e4r') {
      return new HttpResponse(JSON.stringify(data), {
        status: 200,
      })
    } else {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'authentication_failed',
      })
    }

    //TODO: 회원가입 후 로그인 테스트
    /* const data = await request.json()

    for (const member of members) {
      if (data.email === member.email && data.password === member.password) {
        return new HttpResponse(null, {
          status: 200,
          headers: {
            "Set-Cookie": `token=1`,
          },
        })
      }
    }

    return new HttpResponse(null, { status: 404 }) */
  }),

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
  http.get('/api/boardList', async ({ request }) => {
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
  http.get('/api/board/:boardId', async ({ request, params }) => {
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
