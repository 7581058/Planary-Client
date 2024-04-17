import { http, HttpResponse, passthrough } from 'msw'

const members = []

export const handlers = [
  // 회원가입 API
  http.post('/api/signup', async ({ request }) => {
    const data = await request.json()

    members.push(data)

    return new HttpResponse(null, { status: 201 })
  }),

  // 로그인 API
  http.post('/api/login', async ({ request }) => {
    const data = {
      accessToken: '12341234',
      refreshToken: '1234',
    }

    const result = await request.json()

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

    //TODO: 회원가입 폼 생성 후 적용
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
    const data1 = {
      boards: {
        title: 'myboard',
        index: 0,
        grid: [
          {
            id: 0,
            row: 1,
            col: 3,
            component: 'profile',
          },
          {
            id: 1,
            row: 1,
            col: 2,
            component: 'player',
          },
          {
            id: 2,
            row: 1,
            col: 2,
            component: 'dday',
          },
          {
            id: 3,
            row: 2,
            col: 3,
            component: 'minicalendar',
          },
          {
            id: 4,
            row: 1,
            col: 2,
            component: 'clock',
          },
          {
            id: 5,
            row: 2,
            col: 2,
            component: 'timer',
          },
          {
            id: 6,
            row: 1,
            col: 2,
            component: 'todo',
          },
        ],
      },
    }

    const data2 = {
      board: {
        title: 'board2',
        index: 1,
        grid: [
          {
            id: 0,
            row: 1,
            col: 3,
            component: 'profile',
          },
          {
            id: 1,
            row: 1,
            col: 2,
            component: 'profile',
          },
          {
            id: 2,
            row: 1,
            col: 2,
            component: 'clock',
          },
          {
            id: 3,
            row: 2,
            col: 3,
            component: 'minicalendar',
          },
          {
            id: 4,
            row: 1,
            col: 2,
            component: 'clock',
          },
          {
            id: 5,
            row: 2,
            col: 2,
            component: 'timer',
          },
          {
            id: 6,
            row: 1,
            col: 2,
            component: 'todo',
          },
        ],
      },
    }

    const token = request.headers.get('Authorization')
    const { boardId } = params
    if (token === '12341234' && boardId === '0') {
      return new HttpResponse(JSON.stringify(data1), {
        status: 200,
      })
    } else if (token === '12341234' && boardId === '1') {
      return new HttpResponse(JSON.stringify(data2), {
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
]
