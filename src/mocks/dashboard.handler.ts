import { http, HttpResponse } from 'msw'
import { MSW_DASHBOARD_LAYOUTS } from './constants'
import {
  RES_DASHBOARD_ID_FAIL_INVALID,
  RES_DASHBOARD_LIST_RETRIEVED_SUCCESS,
  RES_DASHBOARD_LIST_RETRIEVED_SUCCESS_EMPTY,
  RES_DASHBOARD_RETRIEVED_SUCCESS,
  RES_DASHBOARD_RETRIEVED_SUCCESS_EMPTY,
  RES_INTERNAL_SERVER_ERROR,
} from './resMessage'
import { authenticateRequest } from './utils'

export const dashboardHandlers = [
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
]
