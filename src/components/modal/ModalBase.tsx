import { css, useTheme } from '@emotion/react'
import { Theme } from '@emotion/react'
import React from 'react'

import { useModal } from '@/hooks/useModal'
import { rgba } from '@/utils/convertRGBA'

const ModalBase = () => {
  const theme = useTheme()
  const { modalState } = useModal()

  if (modalState.hasAsync) {
    return (
      <React.Suspense fallback={<></>}>
        <div css={modalBackground(theme, modalState.isOpen)}>
          <div css={modalContainer}>{modalState.content}</div>
        </div>
      </React.Suspense>
    )
  }

  return (
    <div css={modalBackground(theme, modalState.isOpen)}>
      <div css={modalContainer}>{modalState.content}</div>
    </div>
  )
}

export default ModalBase

const modalBackground = (theme: Theme, isOpen: boolean) => css`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  visibility: ${isOpen ? 'visible' : 'hidden'};
  background-color: ${rgba(theme.modalBackground, 0.2)};
`

const modalContainer = (theme: Theme) => css`
  padding: 20px;
  background-color: ${theme.modalContainerBackground};
  border: 1px solid ${theme.border};
  border-radius: 16px;
`
