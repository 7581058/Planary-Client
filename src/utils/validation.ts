import { LOGIN_MESSAGE } from '@/constants/message'

interface ConfirmValuesType {
  password: string
}

export const loginFormValidation = {
  email: {
    required: LOGIN_MESSAGE.email_required,
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: LOGIN_MESSAGE.email_rex_error,
    },
  },
  password: {
    required: '비밀번호를 입력해 주세요.',
  },
}

export const signupFormValidation = {
  email: {
    ...loginFormValidation.email,
  },
  password: {
    ...loginFormValidation.password,
    minLength: { value: 8, message: '8~16자의 영문 대/소문자, 숫자, 특수문자(!@#$%^&*)를 사용해 주세요.' },
    maxLength: { value: 16, message: '8~16자의 영문 대/소문자, 숫자, 특수문자(!@#$%^&*)를 사용해 주세요.' },
    pattern: {
      value: /^(?=.*[@#$%^&*])[A-Za-z0-9@#$%^&*]{8,16}$/,
      message: '8~16자의 영문 대/소문자, 숫자, 특수문자(!@#$%^&*)를 사용해 주세요.',
    },
  },
  confirmPassword: {
    required: '비밀번호 확인이 필요합니다.',
    validate: (value: string, values: ConfirmValuesType) =>
      value === values.password || '비밀번호가 일치하지 않습니다.',
  },
  username: {
    minLength: { value: 2, message: '2~16자의 한글, 영어 대소문자, 숫자만 사용할 수 있습니다.' },
    maxLength: { value: 16, message: '2~16자의 한글, 영어 대소문자, 숫자만 사용할 수 있습니다.' },
    pattern: {
      value: /^[ㄱ-힣a-zA-Z0-9]{2,20}$/,
      message: '2~20자의 한글, 영어 대소문자, 숫자만 사용할 수 있습니다.',
    },
  },
  birth: {
    minLength: { value: 8, message: '생년월일을 YYYYMMDD 형식으로 입력해주세요. 예: 19990101' },
    maxLength: { value: 8, message: '생년월일을 YYYYMMDD 형식으로 입력해주세요. 예: 19990101' },
    pattern: {
      value: /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/,
      message: '생년월일을 YYYYMMDD 형식으로 입력해주세요. 예: 19990101',
    },
  },
}
