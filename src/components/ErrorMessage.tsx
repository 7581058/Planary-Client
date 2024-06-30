import { css, Theme } from '@emotion/react'

import { Common } from '@/styles/common'
const ErrorMessage = ({ msg }: { msg: string | undefined }) => {
  return <div css={errorMessage}>{msg}</div>
}

export default ErrorMessage

const errorMessage = (theme: Theme) => css`
  display: flex;
  align-items: center;

  height: 30px;

  font-size: ${Common.fontSize.fs7};
  color: ${theme.errorRed};
`
