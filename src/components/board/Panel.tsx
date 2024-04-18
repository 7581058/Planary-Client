import { css, useTheme } from '@emotion/react'
import { Theme } from '@emotion/react'

export interface PanelProps {
  row: number
  col: number
  component: JSX.Element
}

const Panel = ({ row, col, component }: PanelProps) => {
  const theme = useTheme()

  return (
    <div css={panelContainer(row, col, theme)}>
      <div css={panelWrap}>
        <div css={widget}>{component}</div>
      </div>
    </div>
  )
}

export default Panel

const panelContainer = (row: number, col: number, theme: Theme) => css`
  position: relative;

  grid-column: span ${col};
  grid-row: span ${row};

  box-sizing: border-box;

  background-color: ${theme.panel};
  border: 5px solid ${theme.border};
  border-radius: 16px;
`

const panelWrap = css`
  width: 100%;
  height: 100%;
`

const widget = css`
  overflow: hidden;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 5px;

  border-radius: 16px;
`
