//공통
export const RES_INTERNAL_SERVER_ERROR = {
  res: {
    success: false,
    message: 'Internal server error',
  },
  code: 500,
}

//회원가입
export const RES_USER_REGIST_SUCCESS = {
  res: {
    success: true,
    message: 'User registered successfully',
  },
  code: 201,
}

export const RES_USER_REGIST_FAIL_REQUIRED = {
  res: {
    success: false,
    message: 'Username, email, password, birth and agree are required',
  },
  code: 400,
}

//로그인
export const RES_USER_LOGIN_FAIL_NO_USER = {
  res: {
    success: false,
    message: 'Invalid credentials. Please check your username and password.',
  },
  code: 401,
}

export const RES_USER_LOGIN_SUCCESS = {
  res: {
    success: true,
    message: 'Login successfully',
  },
  code: 200,
}

export const RES_USER_LOGIN_FAIL_INVAILD = {
  res: {
    success: false,
    message: 'Invalid Email or Password',
  },
  code: 401,
}
