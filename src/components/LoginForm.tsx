import { css, Theme } from '@emotion/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from './ErrorMessage'

import { login } from '@/api'
import { LOGIN_FAILED_ALERT } from '@/constants/alert'
import { DASHBOARD_PATH } from '@/constants/paths'
import { useAlert } from '@/hooks/useAlert'
import { Common } from '@/styles/common'
import { loginFormValidation } from '@/utils/validation'

interface LoginFormType {
  email: string
  password: string
}

const LoginForm = () => {
  const navigator = useNavigate()
  const { openAlert } = useAlert()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>()

  const onSubmit = async (data: LoginFormType) => {
    try {
      const res = await login({ email: data.email, password: data.password })
      if (res) {
        localStorage.setItem('accessToken', res.accessToken)
        navigator(DASHBOARD_PATH)
      }
    } catch (error) {
      openAlert(LOGIN_FAILED_ALERT)
    }
  }

  return (
    <form css={formWrap} onSubmit={handleSubmit(onSubmit)}>
      <label css={inputLabel} htmlFor="email">
        E-mail
      </label>
      <input type="text" id="email" css={input} {...register('email', loginFormValidation.email)} />
      <label css={inputLabel} htmlFor="password">
        Password
      </label>
      <input type="password" id="password" css={input} {...register('password', loginFormValidation.password)} />
      <ErrorMessage msg={errors.email?.message || errors.password?.message} />
      <button type="submit" css={loginButton}>
        Log in
      </button>
    </form>
  )
}

export default LoginForm

const formWrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const input = (theme: Theme) => css`
  box-sizing: border-box;
  width: 100%;
  height: 3rem;
  padding: 15px;

  font-size: ${Common.fontSize.fs10};
  color: ${theme.text};

  background-color: ${theme.inputBackground};
  background-color: transparent;
  border: 3px solid ${theme.border};
  border-radius: 8px;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    box-shadow: 0 0 0 1000px ${theme.inputBackground} inset !important;
    transition: background-color 9999s ease-out;
    transition: background-color 5000s ease-in-out 0s;

    -webkit-text-fill-color: ${theme.inputText} !important;
  }
`

const inputLabel = (theme: Theme) => css`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 5px;

  font-size: ${Common.fontSize.fs8};
  font-weight: 300;
  color: ${theme.inputLabel};
  text-align: left;
`

const loginButton = (theme: Theme) => css`
  cursor: pointer;

  width: 100%;
  height: 3rem;
  margin-top: 2rem;

  font-size: ${Common.fontSize.fs12};
  font-weight: 700;
  color: ${theme.buttonText};

  background-color: ${theme.button};
  border-radius: 8px;

  &:hover {
    scale: 1.01;
  }
`
