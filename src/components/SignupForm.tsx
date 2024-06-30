import { css, Theme } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { IoIosArrowForward } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import CustomInput from './input/CustomInput'
import ErrorMessage from './ErrorMessage'

import { signUp } from '@/api'
import { SIGNUP_FAILED_ALERT, SIGNUP_SUCCESS_ALERT } from '@/constants/alert'
import { SIGNUP_CHECKBOX } from '@/constants/checkbox'
import { CheckBoxType } from '@/constants/enum'
import { SIGNUP_INPUTS } from '@/constants/form'
import { LOGIN_PATH } from '@/constants/paths'
import { SIGNUP_TERMS } from '@/constants/terms'
import { useAlert } from '@/hooks/useAlert'
import { useModal } from '@/hooks/useModal'
import { Common } from '@/styles/common'

interface SignupFormType {
  email: string
  password: string
  username: string
  birth: string
  confirmPassword: string
}

type AgreeState = {
  [key: string]: boolean
}

const SignupForm = () => {
  const { openModal } = useModal()
  const navigator = useNavigate()
  const { openAlert } = useAlert()
  const methods = useForm<SignupFormType>({
    mode: 'onChange',
  })
  const {
    handleSubmit,
    formState: { errors, isValid },
  } = methods
  const [isAllAgree, setIsAllAgree] = useState(false)
  const [isAgree, setIsAgree] = useState<AgreeState>({
    agree01: false,
    agree02: false,
    agree03: false,
  })

  const isFormValid = isValid && isAgree.agree01 && isAgree.agree02

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

  const handleCheckAllAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setIsAllAgree(checked)
    setIsAgree({
      agree01: checked,
      agree02: checked,
      agree03: checked,
    })
  }

  const handleCheckAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target
    setIsAgree((prevState) => ({
      ...prevState,
      [id]: checked,
    }))
  }

  useEffect(() => {
    const allChecked = Object.values(isAgree).every((value) => value === true)
    setIsAllAgree(allChecked)
  }, [isAgree])

  const handleClickAgreeMore = (id: string) => {
    console.log(id)
    const term = SIGNUP_TERMS.find((term) => term.id === id)
    if (term) {
      openModal(term.content, false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form css={formWrap} onSubmit={handleSubmit(onSubmit)}>
        {SIGNUP_INPUTS.map((input) => (
          <>
            <label css={inputLabel} htmlFor={input.id}>
              {input.label}
            </label>
            <CustomInput
              inputType={input.inputType}
              inputId={input.id}
              inputHeight="3rem"
              customType={input.customType}
              inputValidation={input.validation}
            />
            <div css={messageWrap}>
              <ErrorMessage msg={errors[input.id as keyof SignupFormType]?.message} />
            </div>
          </>
        ))}
        <div css={agreeContainer}>
          {SIGNUP_CHECKBOX.map((data) => (
            <div css={agreeWrap} key={data.id}>
              <input
                type="checkbox"
                id={data.id}
                checked={data.type === CheckBoxType.Parents ? isAllAgree : isAgree[data.id]}
                css={data.type === CheckBoxType.Parents ? AllAreeChk : areeChk}
                onChange={data.type === CheckBoxType.Parents ? handleCheckAllAgree : handleCheckAgree}
              />
              <label htmlFor={data.id} css={data.type === CheckBoxType.Parents ? allAgreeLabel : agreeLabel}>
                <span>{data.label}</span>
              </label>
              {data.type !== CheckBoxType.Parents && (
                <button type="button" css={moreButton} onClick={() => handleClickAgreeMore(data.id)}>
                  <IoIosArrowForward />
                </button>
              )}
            </div>
          ))}
        </div>
        <button type="submit" css={signupButton} disabled={!isFormValid}>
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

const agreeContainer = css`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  width: 100%;
`

const agreeWrap = css`
  position: relative;

  display: flex;
  gap: 5px;
  align-items: center;

  width: 100%;
`

const AllAreeChk = (theme: Theme) => css`
  cursor: pointer;

  width: 20px;
  height: 20px;

  appearance: none;
  background-color: ${theme.checkboxBackground};
  background-image: url('/src/assets/check.svg');
  background-position: 50% 50%;
  background-size: 80%;
  border-radius: 50%;

  &:checked {
    background-color: ${theme.checkboxActiveBackground};
    background-image: url('/src/assets/check_white.svg');
  }
`

const allAgreeLabel = (theme: Theme) => css`
  cursor: pointer;
  color: ${theme.checkLabelText};
`

const agreeLabel = (theme: Theme) => css`
  cursor: pointer;
  color: ${theme.checkLabelSubText};
`

const areeChk = css`
  cursor: pointer;

  width: 20px;
  height: 20px;

  appearance: none;
  background-image: url('/src/assets/check_secondary.svg');
  background-position: 50% 50%;

  &:checked {
    background-image: url('/src/assets/check_primary.svg');
  }
`

const moreButton = (theme: Theme) => css`
  cursor: pointer;

  position: absolute;
  right: 0;

  color: ${theme.agreeMoreButtonColor};

  background-color: transparent;
`
