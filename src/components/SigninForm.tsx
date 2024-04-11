import { css, Theme } from '@emotion/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from './ErrorMessage'

import { signin } from '@/api'
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
    try {
      const res = await signin({ email: data.email, password: data.password })
      if (res) {
        localStorage.setItem('accessToken', res.accessToken)
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
        Sign in
      </button>
    </form>
  )
}

export default SigninForm

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

const signinButton = (theme: Theme) => css`
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
