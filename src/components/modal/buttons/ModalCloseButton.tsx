import { css, useTheme } from '@emotion/react'
import { Theme } from '@emotion/react'

import { useModal } from '@/hooks/useModal'
import { Common } from '@/styles/common'

interface ModalCloseButtonProps {
  isAbsolute: boolean
  isRight?: boolean | undefined
}

const ModalCloseButton = ({ isAbsolute, isRight }: ModalCloseButtonProps) => {
  const { closeModal } = useModal()
  const theme = useTheme()

  const handleClickClose = () => {
    closeModal()
  }

  return (
    <button css={modalCloseButton(theme, isAbsolute, isRight)} onClick={handleClickClose}>
      닫기
    </button>
  )
}

export default ModalCloseButton

const modalCloseButton = (theme: Theme, isAbsolute: boolean, isRight: boolean | undefined) => css`
  cursor: pointer;

  position: ${isAbsolute ? 'absolute' : 'relative'};
  ${isRight && 'right: 0;'}

  bottom: 0;

  width: 50px;
  height: 30px;

  font-size: ${Common.fontSize.fs9};
  color: ${theme.buttonText};

  background-color: ${theme.subButton};
  border-radius: 8px;
`
