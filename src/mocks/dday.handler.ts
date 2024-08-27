import { http, HttpResponse } from 'msw'
import { DefaultBodyType } from 'msw'
import { ddayData } from './ddayData'
import {
  RES_DDAY_CREATE_FAIL_REQUIRED,
  RES_DDAY_CREATE_SUCCESS,
  RES_DDAY_DELETE_SUCCESS,
  RES_DDAY_LIST_RETRIEVED_SUCCESS,
  RES_DDAY_UPDATE_SUCCESS,
} from './resMessage'
import { authenticateRequest } from './utils'

type DdayBody = DefaultBodyType & {
  widgetId: number
  icon: number
  title: string
  date: string
  id: number
}

export const ddays: DdayBody[] = []
export const ddayHandlers = [
  //디데이 조회
  http.get('/dday/:widgetId', async ({ request, params }) => {
    const authResponse = authenticateRequest(request)
    if (authResponse) return authResponse

    const { widgetId } = params
    const widgetDdays = ddays.filter((dday) => dday.widgetId === Number(widgetId))

    return HttpResponse.json(
      {
        ...RES_DDAY_LIST_RETRIEVED_SUCCESS.res,
        isAuto: ddayData.isAuto,
        ddayList: [...ddayData.ddayList, ...widgetDdays],
      },
      {
        status: RES_DDAY_LIST_RETRIEVED_SUCCESS.code,
      },
    )
  }),

  //디데이 추가
  http.post('/dday', async ({ request }) => {
    const data = (await request.json()) as DdayBody

    if (!data.widgetId || !data.icon || !data.title || !data.date) {
      return HttpResponse.json(RES_DDAY_CREATE_FAIL_REQUIRED.res, { status: RES_DDAY_CREATE_FAIL_REQUIRED.code })
    }

    //TODO: 옵티미스틱하게 바꾸거나 추가 반영 방법찾기
    //!FIX: 현재 상태에서 요청하면 리프레시쿼리 통해서 무한루프 돌고있음
    /* const newDday = {
      widgetId: data.widgetId,
      icon: data.icon,
      title: data.title,
      date: data.date,
      id: Date.now(),
    }

    ddays.push(newDday) */

    return HttpResponse.json(RES_DDAY_CREATE_SUCCESS.res, { status: RES_DDAY_CREATE_SUCCESS.code })
  }),

  //디데이 삭제
  http.delete('/dday/:ddayId', async ({ params }) => {
    /* const { ddayId } = params
    const index = ddays.findIndex((dday) => dday.id === ddayId)

    if (index === -1) {
      return HttpResponse.json(RES_DDAY_FAIL_NOT_FOUND.res, { status: RES_DDAY_FAIL_NOT_FOUND.code })
    }

    ddays.splice(index, 1) */

    return HttpResponse.json(RES_DDAY_DELETE_SUCCESS.res, { status: RES_DDAY_DELETE_SUCCESS.code })
  }),

  //디데이 수정
  http.put('/dday/:ddayId', async ({ request, params }) => {
    /* const { ddayId } = params
    const updateData = (await request.json()) as Partial<DdayBody>

    const index = ddays.findIndex((dday) => dday.id === ddayId)

    if (index === -1) {
      return HttpResponse.json(RES_DDAY_FAIL_NOT_FOUND.res, { status: RES_DDAY_FAIL_NOT_FOUND.code })
    }

    ddays[index] = { ...ddays[index], ...updateData } */

    return HttpResponse.json(RES_DDAY_UPDATE_SUCCESS.res, { status: RES_DDAY_UPDATE_SUCCESS.code })
  }),
]
