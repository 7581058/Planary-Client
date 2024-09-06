import { css } from '@emotion/react'
import { Theme } from '@emotion/react'

import { useModal } from '@/hooks/useModal'
import { Common } from '@/styles/common'

const ModalCloseButton = () => {
  const { closeModal } = useModal()

  const handleClickClose = () => {
    closeModal()
  }

  return (
    <button css={modalCloseButton} onClick={handleClickClose}>
      닫기
    </button>
  )
}

export default ModalCloseButton

const modalCloseButton = (theme: Theme) => css`
  cursor: pointer;

  position: absolute;
  bottom: 0;

  width: 50px;
  height: 30px;

  font-size: ${Common.fontSize.fs9};
  color: ${theme.buttonText};

  background-color: ${theme.subButton};
  border-radius: 8px;
`
