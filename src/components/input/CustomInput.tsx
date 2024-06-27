import { css, useTheme } from '@emotion/react'
import { Theme } from '@emotion/react'
import { useState } from 'react'
import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form'
import { IoMdEyeOff } from 'react-icons/io'
import { IoEye } from 'react-icons/io5'
import { TiDelete } from 'react-icons/ti'

import { CustomInputType } from '@/constants/enum'
interface CustomInputProps {
  customType?: CustomInputType
  inputType?: string
  borderWidth?: string
  borderColor?: string
  borderRadius?: string
  inputWidth?: string
  inputHeight?: string
  inputBackgroundColor?: string
  inputValidation: RegisterOptions<FieldValues, string> | undefined
  inputId: string
}
const CustomInput = ({
  customType = CustomInputType.None,
  inputType = 'text',
  borderWidth = '2px',
  borderColor = '${theme.border}',
  borderRadius = '8px',
  inputWidth = '100%',
  inputHeight = '40px',
  inputBackgroundColor = '${theme.inputBackground}',
  inputId,
  inputValidation,
}: CustomInputProps) => {
  const { register, reset } = useFormContext()
  const theme = useTheme()
  const [isShow, setIsShow] = useState(false)
  const [isChanged, setIsChanged] = useState(false)

  const handleClickShow = () => {
    setIsShow(!isShow)
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setIsChanged(value !== '')
  }

  const handleClickClear = () => {
    reset()
    setIsChanged(false)
  }

  return (
    <div css={inputWrap}>
      <input
        type={isShow ? 'text' : inputType}
        id={inputId}
        css={customInput(
          theme,
          customType,
          borderWidth,
          borderColor,
          borderRadius,
          inputWidth,
          inputHeight,
          inputBackgroundColor,
        )}
        {...register(inputId, inputValidation)}
        onChange={handleChangeInput}
      />
      <div css={buttonWrap}>
        {isChanged && (customType === CustomInputType.Clear || customType === CustomInputType.ClearAndShow) && (
          <button type="button" onClick={handleClickClear} css={inputButton(theme, inputHeight)}>
            <TiDelete />
          </button>
        )}
        {(customType === CustomInputType.ClearAndShow || customType === CustomInputType.Show) && (
          <button type="button" css={inputButton(theme, inputHeight)} onClick={handleClickShow}>
            {isShow ? <IoEye /> : <IoMdEyeOff />}
          </button>
        )}
      </div>
    </div>
  )
}

export default CustomInput

const inputWrap = css`
  position: relative;
  width: 100%;
  height: 100%;
`

const customInput = (
  theme: Theme,
  customType: CustomInputType,
  borderWidth: string,
  borderColor: string,
  borderRadius: string,
  inputWidth: string,
  inputHeight: string,
  inputBackgroundColor: string,
) => {
  let inputPadding

  switch (customType) {
    case CustomInputType.Clear:
      inputPadding = '30px'
      break
    case CustomInputType.ClearAndShow:
      inputPadding = '60px'
      break
    case CustomInputType.Show:
      inputPadding = '30px'
      break
    case CustomInputType.None:
      inputPadding = '15px'
      break
    default:
      return (inputPadding = '15px')
  }
  return css`
    box-sizing: border-box;
    width: ${inputWidth};
    height: ${inputHeight};
    padding: 15px;
    padding-right: ${inputPadding};

    background-color: ${inputBackgroundColor};
    border-color: ${borderColor};
    border-width: ${borderWidth};
    border-radius: ${borderRadius};

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
}

const buttonWrap = css`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
`

const inputButton = (theme: Theme, inputHeight: string) => css`
  width: 30px;
  height: ${inputHeight};
  padding: 0;

  font-size: 1.2rem;
  color: ${theme.subButtonText};

  background-color: transparent;
`
