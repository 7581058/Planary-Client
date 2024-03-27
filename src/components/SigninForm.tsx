import { css, Theme } from '@emotion/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from './ErrorMessage'

import { login } from '@/api'
import { Common } from '@/styles/common'
import { signinFormValidation } from '@/utils/validation'
interface SignInFormType {
  email: string
  password: string
}

const SigninForm = () => {
  const navigator = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>()

  const onSubmit = async (data: SignInFormType) => {
    alert(JSON.stringify(data))
    try {
      const res = await login({ email: data.email, password: data.password })
      if (res) {
        alert('로그인성공')
        navigator('/board')
      } else {
        alert('로그인실패')
      }
    } catch (error) {
      alert(`로그인실패${error}`)
    }
  }

  return (
    <form css={formWrap} onSubmit={handleSubmit(onSubmit)}>
      <label css={inputLabel} htmlFor="email">
        E-mail
      </label>
      <input type="text" id="email" css={input} {...register('email', signinFormValidation.email)} />
      <label css={inputLabel} htmlFor="password">
        Password
      </label>
      <input type="password" id="password" css={input} {...register('password', signinFormValidation.password)} />
      <ErrorMessage msg={errors.email?.message || errors.password?.message} />
      <button type="submit" css={signinButton}>
        SignIn
      </button>
    </form>
  )
}

export default SigninForm

const formWrap = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const input = (theme: Theme) => css`
  width: 70%;
  height: 3rem;
  box-sizing: border-box;
  background-color: transparent;
  border-bottom: 3px solid rgba(255, 255, 255, 0.3);
  font-size: ${Common.fontSize.fs10};
  color: ${theme.text};
`

const inputLabel = css`
  width: 70%;
  color: ${Common.colors.white};
  font-weight: 700;
  text-align: left;
  margin-top: 20px;
  font-size: ${Common.fontSize.fs10};
`

const signinButton = (theme: Theme) => css`
  width: 70%;
  height: 3rem;
  background-color: ${theme.button};
  color: ${theme.buttonText};
  margin-top: 2rem;
  font-size: ${Common.fontSize.fs12};
  cursor: pointer;
  &:hover {
    scale: 1.01;
  }
`
