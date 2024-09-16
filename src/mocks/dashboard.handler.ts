import { http, HttpResponse } from 'msw'
import { MSW_DASHBOARD_LAYOUTS } from './constants'
import { boardListData } from './dashboardListData'
import { defaultBoardData } from './data'
import {
  RES_DASHBOARD_CREATE_FAIL,
  RES_DASHBOARD_CREATE_SUCCESS,
  RES_DASHBOARD_DELETE_SUCCESS,
  RES_DASHBOARD_FAIL_NOT_FOUND,
  RES_DASHBOARD_ID_FAIL_INVALID,
  RES_DASHBOARD_LIST_RETRIEVED_SUCCESS,
  RES_DASHBOARD_LIST_RETRIEVED_SUCCESS_EMPTY,
  RES_DASHBOARD_RETRIEVED_SUCCESS,
  RES_DASHBOARD_RETRIEVED_SUCCESS_EMPTY,
  RES_DASHBOARD_UPDATE_SUCCESS,
  RES_INTERNAL_SERVER_ERROR,
} from './resMessage'
import { authenticateRequest } from './utils'

interface DashboardBody {
  title: string
  userId: string
  theme: string
}
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
            boardList: boardListData,
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

  // 대시보드 추가
  http.post('/dashboard/create', async ({ request }) => {
    const data = (await request.json()) as DashboardBody

    if (!data.title || !data.userId || !data.theme) {
      return HttpResponse.json(RES_DASHBOARD_CREATE_FAIL.res, { status: RES_DASHBOARD_CREATE_FAIL.code })
    }

    //TODO:유저 아이디 검증 로직 필요하다면 추가

    const newBoard = {
      title: data.title,
      theme: data.theme,
      id: boardListData.length + 1,
    }

    boardListData.push(newBoard)

    const newKey: number = Object.keys(MSW_DASHBOARD_LAYOUTS).length + 1
    MSW_DASHBOARD_LAYOUTS[newKey] = defaultBoardData

    return HttpResponse.json(RES_DASHBOARD_CREATE_SUCCESS.res, { status: RES_DASHBOARD_CREATE_SUCCESS.code })
  }),

  //대시보드 삭제
  http.delete('/dashboard/:boardId', async ({ params }) => {
    const { boardId } = params
    const index = boardListData.findIndex((board) => board.id === Number(boardId))

    if (index === -1) {
      return HttpResponse.json(RES_DASHBOARD_FAIL_NOT_FOUND.res, { status: RES_DASHBOARD_FAIL_NOT_FOUND.code })
    }

    boardListData.splice(index, 1)

    return HttpResponse.json(RES_DASHBOARD_DELETE_SUCCESS.res, { status: RES_DASHBOARD_DELETE_SUCCESS.code })
  }),

  //대시보드 수정
  http.put('/dashboard/:boardId', async ({ request, params }) => {
    const { boardId } = params

    const updateData = (await request.json()) as Partial<DashboardBody>

    const index = boardListData.findIndex((board) => board.id === Number(boardId))

    if (index === -1) {
      return HttpResponse.json(RES_DASHBOARD_FAIL_NOT_FOUND.res, { status: RES_DASHBOARD_FAIL_NOT_FOUND.code })
    }

    boardListData[index] = { ...boardListData[index], ...updateData }

    return HttpResponse.json(RES_DASHBOARD_UPDATE_SUCCESS.res, { status: RES_DASHBOARD_UPDATE_SUCCESS.code })
  }),
]
