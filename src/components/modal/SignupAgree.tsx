import { css } from '@emotion/react'
import { IoMdClose } from 'react-icons/io'

import { useModal } from '@/hooks/useModal'
import { Common } from '@/styles/common'

interface SignupAgreeProps {
  contents: string
}
const SignupAgree = ({ contents }: SignupAgreeProps) => {
  const { closeModal } = useModal()
  return (
    <div css={container}>
      <button css={closeButton} onClick={closeModal}>
        <IoMdClose />
      </button>
      <div css={contentWrap}>{contents}</div>
    </div>
  )
}

export default SignupAgree

const container = css`
  width: 400px;
  height: 500px;
  padding: 20px;
`

const closeButton = css`
  cursor: pointer;

  position: absolute;
  top: 10px;
  right: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
  padding: 0;

  font-size: ${Common.fontSize.fs16};

  background-color: transparent;
`

const contentWrap = css`
  overflow-y: auto;
  width: 100%;
  height: 100%;
`
