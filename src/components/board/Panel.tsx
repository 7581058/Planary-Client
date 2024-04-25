import { css, useTheme } from '@emotion/react'
import { Theme } from '@emotion/react'

import { componentMap, previewMap } from '@/constants/widget'
export interface PanelProps {
  component: string
  isPreview: boolean
}

const Panel = ({ component, isPreview }: PanelProps) => {
  const theme = useTheme()
  let Widget

  if (isPreview) {
    Widget = previewMap[component]
  } else {
    Widget = componentMap[component]
  }

  return (
    <div css={panelContainer(isPreview, theme)}>
      <div css={panelWrap}>
        <div css={widget}>{Widget ? <Widget /> : component}</div>
      </div>
    </div>
  )
}

export default Panel

const panelContainer = (isPreview: boolean, theme: Theme) => css`
  position: relative;

  width: 100%;
  height: 100%;

  background-color: ${isPreview ? theme.previewPanelBackground : theme.panel};
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
