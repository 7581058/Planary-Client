import { LOGIN_MESSAGE, SIGNUP_MESSAGE } from '@/constants/message'

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
    required: LOGIN_MESSAGE.password_required,
  },
}

export const signupFormValidation = {
  email: {
    ...loginFormValidation.email,
  },
  password: {
    ...loginFormValidation.password,
    minLength: { value: 8, message: SIGNUP_MESSAGE.password_rex_error },
    maxLength: { value: 16, message: SIGNUP_MESSAGE.password_rex_error },
    pattern: {
      value: /^(?=.*[@#$%^&*])[A-Za-z0-9@#$%^&*]{8,16}$/,
      message: SIGNUP_MESSAGE.password_rex_error,
    },
  },
  confirmPassword: {
    require: SIGNUP_MESSAGE.password_confirm_required,
    validate: (value: string, values: ConfirmValuesType) =>
      value === values.password || SIGNUP_MESSAGE.password_confirm_rex_error,
  },
  username: {
    require: SIGNUP_MESSAGE.username_required,
    minLength: { value: 2, message: SIGNUP_MESSAGE.username_rex_error },
    maxLength: { value: 16, message: SIGNUP_MESSAGE.username_rex_error },
    pattern: {
      value: /^[ㄱ-힣a-zA-Z0-9]{2,20}$/,
      message: SIGNUP_MESSAGE.username_rex_error,
    },
  },
  birth: {
    require: SIGNUP_MESSAGE.birth_required,
    minLength: { value: 8, message: SIGNUP_MESSAGE.birth_rex_error },
    maxLength: { value: 8, message: SIGNUP_MESSAGE.birth_rex_error },
    pattern: {
      value: /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/,
      message: SIGNUP_MESSAGE.birth_rex_error,
    },
  },
}
