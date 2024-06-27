import { css, Theme } from '@emotion/react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import CustomInput from './input/CustomInput'
import ErrorMessage from './ErrorMessage'

import { signUp } from '@/api'
import { SIGNUP_FAILED_ALERT, SIGNUP_SUCCESS_ALERT } from '@/constants/alert'
import { CustomInputType } from '@/constants/enum'
import { LOGIN_PATH } from '@/constants/paths'
import { useAlert } from '@/hooks/useAlert'
import { Common } from '@/styles/common'
import { signupFormValidation } from '@/utils/validation'

interface SignupFormType {
  email: string
  password: string
  username: string
  birth: string
  confirmPassword: string
}

const SignupForm = () => {
  const navigator = useNavigate()
  const { openAlert } = useAlert()
  const methods = useForm<SignupFormType>()
  const {
    handleSubmit,
    formState: { errors, isValid },
  } = methods

  const handleClickConfirm = () => {
    navigator(LOGIN_PATH, { replace: true })
  }

  const onSubmit = async (data: SignupFormType) => {
    try {
      const res = await signUp({
        username: data.username,
        email: data.email,
        password: data.password,
        birth: data.birth,
      })
      if (res) {
        openAlert({
          ...SIGNUP_SUCCESS_ALERT,
          callback: handleClickConfirm,
        })
      }
    } catch (error) {
      openAlert(SIGNUP_FAILED_ALERT)
    }
  }

  return (
    <FormProvider {...methods}>
      <form css={formWrap} onSubmit={handleSubmit(onSubmit)}>
        <label css={inputLabel} htmlFor="email">
          E-mail
        </label>
        <CustomInput
          inputId="email"
          inputHeight="3rem"
          customType={CustomInputType.Clear}
          inputValidation={signupFormValidation.email}
        />
        <div css={messageWrap}>
          <ErrorMessage msg={errors.email?.message} />
        </div>
        <label css={inputLabel} htmlFor="password">
          Password
        </label>
        <CustomInput
          inputType="password"
          inputId="password"
          inputHeight="3rem"
          customType={CustomInputType.ClearAndShow}
          inputValidation={signupFormValidation.password}
        />
        <div css={messageWrap}>
          <ErrorMessage msg={errors.password?.message} />
        </div>
        <label css={inputLabel} htmlFor="confirmPassword">
          Password Confirm
        </label>
        <CustomInput
          inputType="password"
          inputId="confirmPassword"
          inputHeight="3rem"
          customType={CustomInputType.ClearAndShow}
          inputValidation={signupFormValidation.password}
        />

        <div css={messageWrap}>
          <ErrorMessage msg={errors.confirmPassword?.message} />
        </div>
        <label css={inputLabel} htmlFor="username">
          User Name
        </label>
        <CustomInput
          inputId="username"
          inputHeight="3rem"
          customType={CustomInputType.Clear}
          inputValidation={signupFormValidation.username}
        />
        <div css={messageWrap}>
          <ErrorMessage msg={errors.username?.message} />
        </div>
        <label css={inputLabel} htmlFor="birth">
          Birth
        </label>
        <CustomInput
          inputId="birth"
          inputHeight="3rem"
          customType={CustomInputType.Clear}
          inputValidation={signupFormValidation.birth}
        />
        <div css={messageWrap}>
          <ErrorMessage msg={errors.birth?.message} />
        </div>
        <button type="submit" css={signupButton} disabled={!isValid}>
          가입하기
        </button>
      </form>
    </FormProvider>
  )
}

export default SignupForm

const formWrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const inputLabel = (theme: Theme) => css`
  width: 100%;
  margin-bottom: 5px;

  font-size: ${Common.fontSize.fs8};
  font-weight: 300;
  color: ${theme.inputLabel};
  text-align: left;
`

const signupButton = (theme: Theme) => css`
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

  &:disabled {
    background-color: ${theme.subButton};
  }
`

const messageWrap = css`
  display: flex;
  width: 100%;
`
