import { css, useTheme } from '@emotion/react'
import { Theme } from '@emotion/react'
import { IoMdSettings } from 'react-icons/io'
import { IoCloseOutline } from 'react-icons/io5'

import { modalMap } from '@/constants/modals'
import { widgetMaps } from '@/constants/widget'
import { useModal } from '@/hooks/useModal'
import { Common } from '@/styles/common'

export interface PanelProps {
  component?: string
  isPreview: boolean
  onDelete?: () => void
  w: number
  h: number
  isCovered: boolean
  widgetId: number
}

const Panel = ({ component, isPreview, onDelete, w, h, isCovered, widgetId }: PanelProps) => {
  const theme = useTheme()
  const { openModal } = useModal()
  let Widget
  let hasSettingsButton = false

  if (component && widgetMaps[component]) {
    Widget = widgetMaps[component].component
    hasSettingsButton = widgetMaps[component].hasSettingsButton
  }

  const handleClickSetting = () => {
    if (component) {
      const Modal = modalMap[component].component
      openModal(<Modal />, modalMap[component].hasAsync)
    }
  }

  return (
    <div css={panelContainer(isPreview, theme)}>
      <div css={panelWrap}>
        {hasSettingsButton && !isPreview && !isCovered && (
          <button className="setting-button" css={settingButton} onClick={handleClickSetting}>
            <IoMdSettings />
          </button>
        )}
        {isCovered && (
          <>
            <div css={cover}></div>
            <button css={deleteButton} onClick={onDelete}>
              <IoCloseOutline />
            </button>
          </>
        )}
        <div css={widget}>
          {Widget && <Widget widgetId={widgetId} isCovered={isCovered} isPreview={isPreview} w={w} h={h} />}
        </div>
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

  &:hover .setting-button {
    opacity: 1;
  }
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
  z-index: 9;
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

const cover = css`
  position: absolute;
  z-index: 8;

  width: 100%;
  height: 100%;

  border-radius: 16px;
`

const settingButton = (theme: Theme) => css`
  cursor: pointer;

  position: absolute;
  z-index: 99;
  top: 5px;
  right: 5px;

  width: 20px;
  height: 20px;

  color: ${theme.widgetSettingButtons};

  background-color: transparent;

  transition: opacity 0.3s ease-in-out;

  &.setting-button {
    opacity: 0;
  }
`
