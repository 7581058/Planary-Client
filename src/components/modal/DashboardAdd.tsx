import { css, Theme } from '@emotion/react'
import ModalCloseButton from './buttons/ModalCloseButton'

import { Common } from '@/styles/common'

const DashboardAdd = () => {
  const handleClickAdd = () => {}

  return (
    <div css={container}>
      <span css={title}>새 대시보드 추가</span>
      <form>
        <span css={subTitle}>대시보드 이름</span>
        <input css={titleInput} type="text" />
      </form>
      <div css={buttonWrap}>
        <ModalCloseButton isAbsolute={false} />
        <button css={addButton} onClick={handleClickAdd}>
          추가
        </button>
      </div>
    </div>
  )
}

export default DashboardAdd

const container = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const title = css`
  width: 100%;
  font-size: ${Common.fontSize.fs12};
  font-weight: 700;
  text-align: left;
`

const subTitle = (theme: Theme) => css`
  width: 100%;
  font-size: ${Common.fontSize.fs8};
  color: ${theme.previewText};
`

const titleInput = (theme: Theme) => css`
  width: 100%;
  height: 40px;
  border: 2px solid ${theme.border};
`

const buttonWrap = css`
  display: flex;
  gap: 10px;
  justify-content: end;
`

const addButton = (theme: Theme) => css`
  width: 50px;
  height: 30px;

  font-size: ${Common.fontSize.fs9};
  color: ${theme.buttonText};

  background-color: ${theme.button};
  border-radius: 8px;
`
