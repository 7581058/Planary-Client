import { CustomInputType } from './enum'

import { signupFormValidation } from '@/utils/validation'

export const SIGNUP_INPUTS = [
  {
    id: 'email',
    label: 'E-mail',
    inputType: 'text',
    customType: CustomInputType.Clear,
    validation: signupFormValidation.email,
  },
  {
    id: 'password',
    label: 'Password',
    inputType: 'password',
    customType: CustomInputType.ClearAndShow,
    validation: signupFormValidation.password,
  },
  {
    id: 'confirmPassword',
    label: 'Password Confirm',
    inputType: 'password',
    customType: CustomInputType.ClearAndShow,
    validation: signupFormValidation.password,
  },
  {
    id: 'username',
    label: 'User Name',
    inputType: 'text',
    customType: CustomInputType.Clear,
    validation: signupFormValidation.username,
  },
  {
    id: 'birth',
    label: 'Birth',
    inputType: 'text',
    customType: CustomInputType.Clear,
    validation: signupFormValidation.birth,
  },
]
