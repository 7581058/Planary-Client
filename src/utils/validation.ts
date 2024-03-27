import { SIGNIN_MESSAGE } from '@/constants/message'

export const signinFormValidation = {
  email: {
    required: SIGNIN_MESSAGE.email_required,
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: SIGNIN_MESSAGE.email_rex_error,
    },
  },
  password: {
    required: '비밀번호를 입력해 주세요.',
  },
}

//TODO: 회원가입 폼 구현 후 적용
/* export const signupFormValidation = {
  email: {
    ...signinFormValidation.email,
  },
  password: {
    ...signinFormValidation.password,
    minLength: { value: 8, message: '8~16자의 영문 대/소문자, 숫자, 특수문자(!@#$%^&*)를 사용해 주세요.' },
    maxLength: { value: 16, message: '8~16자의 영문 대/소문자, 숫자, 특수문자(!@#$%^&*)를 사용해 주세요.' },
    pattern: {
      value: /^(?=.*[@#$%^&*])[A-Za-z0-9@#$%^&*]{8,16}$/,
      message: '8~16자의 영문 대/소문자, 숫자, 특수문자(!@#$%^&*)를 사용해 주세요.',
    },
  },
  confirmPassword: {
    required: '비밀번호 확인이 필요합니다.',
    validate: (value: string, values: any) => value === values.password || '비밀번호가 일치하지 않습니다.',
  },
} */
