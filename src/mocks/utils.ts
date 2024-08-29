import { DefaultBodyType, HttpResponse, StrictRequest } from 'msw'
import { MSW_TEST_TOKEN } from './constants'
import { RES_TOKEN_FAIL_INVALID, RES_TOKEN_FAIL_MISSING } from './resMessage'

//MSW handler 토큰 검증 (헤더에 있는지, 유효한 토큰인지)
export const authenticateRequest = (request: StrictRequest<DefaultBodyType>) => {
  const token = request.headers.get('Authorization')
  if (!token) {
    return HttpResponse.json(RES_TOKEN_FAIL_MISSING.res, {
      status: RES_TOKEN_FAIL_MISSING.code,
    })
  }

  if (token !== 'Bearer ' + MSW_TEST_TOKEN) {
    return HttpResponse.json(RES_TOKEN_FAIL_INVALID.res, {
      status: RES_TOKEN_FAIL_INVALID.code,
    })
  }

  return null // 인증 성공
}
