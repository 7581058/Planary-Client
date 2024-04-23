import { css, useTheme } from '@emotion/react'
import { Theme } from '@emotion/react'

import { componentMap, previewMap } from '@/constants/widget'
export interface PanelProps {
  row: number
  col: number
  component: string
  isPreview: boolean
}

const Panel = ({ row, col, component, isPreview }: PanelProps) => {
  const theme = useTheme()
  let Widget

  if (isPreview) {
    Widget = previewMap[component]
  } else {
    Widget = componentMap[component]
  }

  return (
    <div css={panelContainer(row, col, theme)}>
      <div css={panelWrap}>
        <div css={widget}>{Widget && <Widget />}</div>
      </div>
    </div>
  )
}

export default Panel

const panelContainer = (row: number, col: number, theme: Theme) => css`
  position: relative;

  grid-column: span ${col};
  grid-row: span ${row};

  background-color: ${theme.panel};
  border: 2px solid ${theme.border};
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
