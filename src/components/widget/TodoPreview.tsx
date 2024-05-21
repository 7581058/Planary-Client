import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { FaCheck } from 'react-icons/fa6'
import { MdModeEdit } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'

import { Common } from '@/styles/common'
const TodoPreview = () => {
  return (
    <div css={container}>
      <div css={inputWrap}>
        <div css={input}>입력후 Enter를 눌러주세요.</div>
      </div>
      <div css={listWrap}>
        <div css={itemWrap}>
          <div css={chkbox}></div>
          <span>todo...</span>
        </div>
        <div css={itemWrap}>
          <div css={[chkbox, checkedBox]}>
            <FaCheck />
          </div>
          <span css={checkedText}>todo...</span>
          <div css={buttonWrap}>
            <MdModeEdit />
            <MdDelete />
          </div>
        </div>
        <div css={itemWrap}>
          <div css={chkbox}></div>
          <span>todo...</span>
        </div>
      </div>
    </div>
  )
}

export default TodoPreview

const container = css`
  width: 100%;
  height: 100%;
  padding: 4px;
`

const inputWrap = css`
  display: flex;
`

const input = (theme: Theme) => css`
  width: 100%;
  height: 25px;

  font-size: ${Common.fontSize.fs8};
  color: ${theme.previewSubText};

  border-bottom: 2px solid ${theme.previewText};
`

const listWrap = css`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;

  margin-top: 10px;
`

const itemWrap = css`
  position: relative;
  display: flex;
  gap: 5px;
  align-items: center;
`

const chkbox = (theme: Theme) => css`
  width: 15px;
  height: 15px;
  background-color: ${theme.previewSubText};
`

const checkedBox = (theme: Theme) => css`
  color: ${theme.previewSubText};
  background-color: ${theme.previewPointText};
`

const checkedText = (theme: Theme) => css`
  color: ${theme.previewText};
  text-decoration: line-through;
`

const buttonWrap = (theme: Theme) => css`
  position: absolute;
  right: 0;

  display: flex;
  gap: 5px;

  color: ${theme.previewText};
`
