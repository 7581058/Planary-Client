//공통 서버 에러
export const RES_INTERNAL_SERVER_ERROR = {
  res: {
    success: false,
    message: 'Internal server error',
  },
  code: 500,
}

//공통 토큰 인증 실패: 유효하지 않은 토큰
export const RES_TOKEN_FAIL_INVALID = {
  res: {
    success: false,
    message: 'Invalid token',
  },
  code: 500,
}

//공통 토큰 인증 실패: 헤더에 Authorization 없음
export const RES_TOKEN_FAIL_MISSING = {
  res: {
    success: false,
    message: 'Authorization header missing',
  },
  code: 500,
}

//회원가입 성공
export const RES_USER_REGIST_SUCCESS = {
  res: {
    success: true,
    message: 'User registered successfully',
  },
  code: 201,
}

//회원가입 실패: 필수 입력 항목 누락
export const RES_USER_REGIST_FAIL_REQUIRED = {
  res: {
    success: false,
    message: 'Username, email, password, birth and agree are required',
  },
  code: 400,
}

//로그인 실패: 가입된 정보 없음
export const RES_USER_LOGIN_FAIL_NO_USER = {
  res: {
    success: false,
    message: 'Invalid credentials. Please check your username and password.',
  },
  code: 401,
}

//로그인 성공
export const RES_USER_LOGIN_SUCCESS = {
  res: {
    success: true,
    message: 'Login successfully',
  },
  code: 200,
}

//로그인 실패: 유효하지 않은 이메일또는 비밀번호
export const RES_USER_LOGIN_FAIL_INVAILD = {
  res: {
    success: false,
    message: 'Invalid Email or Password',
  },
  code: 401,
}

//대시보드 생성 실패
export const RES_DASHBOARD_CREATE_FAIL = {
  res: {
    success: false,
    message: 'Failed to create dashboard',
  },
  code: 400,
}

//대시보드 생성 성공
export const RES_DASHBOARD_CREATE_SUCCESS = {
  res: {
    success: true,
    message: 'Dashboard created successfully',
  },
  code: 201,
}

//대시보드 목록 조회 성공
export const RES_DASHBOARD_LIST_RETRIEVED_SUCCESS = {
  res: {
    success: true,
    message: 'Dashboard list retrieved successfully',
  },
  code: 200,
}

//대시보드 목록 조회 성공: 대시보드 목록 없음, 빈배열 반환
export const RES_DASHBOARD_LIST_RETRIEVED_SUCCESS_EMPTY = {
  res: {
    success: true,
    message: 'No dashboards found for this user',
  },
  code: 200,
}

//대시보드 조회 성공(하나의 대시보드의 전체 위젯 목록)
export const RES_DASHBOARD_RETRIEVED_SUCCESS = {
  res: {
    success: true,
    message: 'Dashboard retrieved successfully',
  },
  code: 200,
}

//대시보드 조회 성공: 대시보드에 위젯 없음, 빈배열 반환
export const RES_DASHBOARD_RETRIEVED_SUCCESS_EMPTY = {
  res: {
    success: true,
    message: 'No widgets found for this dashboard',
  },
  code: 200,
}

//대시보드 조회 실패: 유효하지 않은 대시보드 아이디
export const RES_DASHBOARD_ID_FAIL_INVALID = {
  res: {
    success: false,
    message: 'Invalid board ID',
  },
  code: 404,
}

//디데이 목록 조회 성공
export const RES_DDAY_LIST_RETRIEVED_SUCCESS = {
  res: {
    success: true,
    message: 'Dday list retrieved successfully',
  },
  code: 200,
}

//디데이 목록 조회 성공: 디데이 목록 없음, 빈배열 반환
export const RES_DDAY_LIST_RETRIEVED_SUCCESS_EMPTY = {
  res: {
    success: true,
    message: 'No ddays found',
  },
  code: 200,
}

//디데이 추가 성공
export const RES_DDAY_CREATE_SUCCESS = {
  res: {
    success: true,
    message: 'Dday created successfully',
  },
  code: 200,
}

//디데이 추가 실패
export const RES_DDAY_CREATE_FAIL = {
  res: {
    success: false,
    message: 'Failed to create dday',
  },
  code: 400,
}

//디데이 추가 실패: 필수 입력 항목 누락
export const RES_DDAY_CREATE_FAIL_REQUIRED = {
  res: {
    success: false,
    message: 'WidgetId, title, icon, date are required',
  },
  code: 400,
}

//디데이 삭제 성공
export const RES_DDAY_DELETE_SUCCESS = {
  res: {
    success: true,
    message: 'Dday deleted successfully',
  },
  code: 200,
}

//디데이 삭제 실패
export const RES_DDAY_DELETE_FAIL = {
  res: {
    success: false,
    message: 'Failed to delete dday',
  },
  code: 400,
}

//디데이 수정 성공
export const RES_DDAY_UPDATE_SUCCESS = {
  res: {
    success: true,
    message: 'Dday updated successfully',
  },
  code: 200,
}

//디데이 수정 실패
export const RES_DDAY_UPDATE_FAIL = {
  res: {
    success: false,
    message: 'Failed to update dday',
  },
  code: 400,
}

//디데이 수정,삭제 실패: 해당 아이디 없음
export const RES_DDAY_FAIL_NOT_FOUND = {
  res: {
    success: false,
    message: 'D-day not found',
  },
  code: 404,
}

//디데이 자동재생 변경 성공 
export const RES_DDAY_CAROUSEL_SETTING_UPDATE_SUCCESS = {
  res: {
    success: true,
    message: 'Dday carousel setting updated successfully',
  },
  code: 200,
}

//디데이 자동재생 변경 실패 
export const RES_DDAY_CAROUSEL_SETTING_UPDATE_FAIL = {
  res: {
    success: false,
    message: 'Failed to update carousel setting',
  },
  code: 400,
}

//디데이 순서 변경 성공 
export const RES_DDAY_ORDER_UPDATE_SUCCESS = {
  res: {
    success: true,
    message: 'Dday Order updated successfully',
  },
  code: 200,
}

//디데이 순서 변경 실패 
export const RES_DDAY_ORDER_UPDATE_FAIL = {
  res: {
    success: false,
    message: 'Failed to update dday order',
  },
  code: 400,
}