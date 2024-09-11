import { Theme } from '@emotion/react'
import { css } from '@emotion/react'

const BoardThemeMenu = () => {
  return (
    <div css={themeWrap}>
      <span>테마 설정</span>
      <div css={themeListWrap}></div>
    </div>
  )
}

export default BoardThemeMenu

const themeWrap = css`
  display: flex;
  flex-direction: column;
`

const themeListWrap = css`
  width: 100%;
  height: 150px;
  background-color: gray;
`
