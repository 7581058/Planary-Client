import { http, HttpResponse } from 'msw'
import { DefaultBodyType } from 'msw'
import { ddayData } from './ddayData'
import {
  RES_DDAY_CAROUSEL_SETTING_UPDATE_SUCCESS,
  RES_DDAY_CREATE_FAIL_REQUIRED,
  RES_DDAY_CREATE_SUCCESS,
  RES_DDAY_DELETE_SUCCESS,
  RES_DDAY_FAIL_NOT_FOUND,
  RES_DDAY_LIST_RETRIEVED_SUCCESS,
  RES_DDAY_ORDER_UPDATE_SUCCESS,
  RES_DDAY_UPDATE_SUCCESS,
} from './resMessage'
import { authenticateRequest } from './utils'
import { DdayOrderUpdateRequestBody } from '@/types'

type DdayBody = DefaultBodyType & {
  widgetId: number
  icon: number
  title: string
  date: string
  id: number
}

export let filteredDdays: DdayBody[]

export const ddayHandlers = [
  //디데이 위젯 아이디로 디데이 리스트 조회
  http.get('/dday/:widgetId', async ({ request, params }) => {
    const authResponse = authenticateRequest(request)
    if (authResponse) return authResponse

    const { widgetId } = params
    filteredDdays = ddayData.ddayList.filter((dday) => dday.widgetId === Number(widgetId))

    return HttpResponse.json(
      {
        ...RES_DDAY_LIST_RETRIEVED_SUCCESS.res,
        isAuto: ddayData.isAuto,
        ddayList: filteredDdays,
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

    const newDday = {
      widgetId: data.widgetId,
      icon: data.icon,
      title: data.title,
      date: data.date,
      id: Date.now(),
      order: filteredDdays.length + 1
    }

    ddayData.ddayList.push(newDday)
    return HttpResponse.json(RES_DDAY_CREATE_SUCCESS.res, { status: RES_DDAY_CREATE_SUCCESS.code })
  }),

  //디데이 순서변경
  http.put('/dday/order', async ({ request }) => {
    const updateData = (await request.json()) as DdayOrderUpdateRequestBody[]

    ddayData.ddayList.forEach((item) => {
      const updatedItem = updateData.find((update) => update.id === item.id)
      if (updatedItem) {
        item.order = updatedItem.order
      }
    })
    ddayData.ddayList.sort((a, b) => a.order - b.order)
    return HttpResponse.json(RES_DDAY_ORDER_UPDATE_SUCCESS.res, { status: RES_DDAY_ORDER_UPDATE_SUCCESS.code })
  }),

  //디데이 삭제
  http.delete('/dday/:ddayId', async ({ params }) => {
    const { ddayId } = params
    const index = ddayData.ddayList.findIndex((dday) => dday.id === Number(ddayId))

    if (index === -1) {
      return HttpResponse.json(RES_DDAY_FAIL_NOT_FOUND.res, { status: RES_DDAY_FAIL_NOT_FOUND.code })
    }

    ddayData.ddayList.splice(index, 1)

    return HttpResponse.json(RES_DDAY_DELETE_SUCCESS.res, { status: RES_DDAY_DELETE_SUCCESS.code })
  }),

  //디데이 수정
  http.put('/dday/:ddayId', async ({ request, params }) => {
    const { ddayId } = params
    const updateData = (await request.json()) as Partial<DdayBody>

    const index = ddayData.ddayList.findIndex((dday) => dday.id === Number(ddayId))

    if (index === -1) {
      return HttpResponse.json(RES_DDAY_FAIL_NOT_FOUND.res, { status: RES_DDAY_FAIL_NOT_FOUND.code })
    }

    ddayData.ddayList[index] = { ...ddayData.ddayList[index], ...updateData }

    return HttpResponse.json(RES_DDAY_UPDATE_SUCCESS.res, { status: RES_DDAY_UPDATE_SUCCESS.code })
  }),

  //디데이 자동재생 변경 
  http.put('/dday/:widgetId/auto', async () => {
    ddayData.isAuto = !ddayData.isAuto
    return HttpResponse.json(RES_DDAY_CAROUSEL_SETTING_UPDATE_SUCCESS.res, { status: RES_DDAY_CAROUSEL_SETTING_UPDATE_SUCCESS.code })
  }),

]
