import { Theme } from '@emotion/react'
import { css } from '@emotion/react'

interface SubHeaderProps {
  title: string
}

const SubHeader = ({ title }: SubHeaderProps) => {
  return <div css={container}>{title}</div>
}

export default SubHeader

const container = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 32px;

  color: ${theme.subHeaderText};

  background-color: ${theme.subHeaderBackground};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`
