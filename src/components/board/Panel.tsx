import { css, useTheme } from '@emotion/react'
import { Theme } from '@emotion/react'
import { IoCloseOutline } from 'react-icons/io5'

import { componentMap, previewMap } from '@/constants/widget'
import { Common } from '@/styles/common'
export interface PanelProps {
  component?: string
  isPreview: boolean
  onDelete: () => void
}

const Panel = ({ component, isPreview, onDelete }: PanelProps) => {
  const theme = useTheme()
  let Widget

  if (isPreview && component) {
    Widget = previewMap[component]
  } else if (component) {
    Widget = componentMap[component]
  }

  return (
    <div css={panelContainer(isPreview, theme)}>
      <div css={panelWrap}>
        {isPreview && (
          <button css={deleteButton} onClick={onDelete}>
            <IoCloseOutline />
          </button>
        )}
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

const deleteButton = (theme: Theme) => css`
  cursor: pointer;

  position: absolute;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;

  font-size: ${Common.fontSize.fs14};
  color: ${theme.previewPanelDeleteButton};

  background-color: transparent;

  &:hover {
    color: ${theme.previewPanelDeleteButtonhover};
  }
`
