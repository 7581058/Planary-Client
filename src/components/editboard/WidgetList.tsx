import { Theme } from '@emotion/react'
import { css } from '@emotion/react'

import { previewMap, widgetInfo } from '@/constants/widget'
import { Common } from '@/styles/common'

const WidgetList = () => {
  return (
    <div css={container}>
      <div css={wigetWrap}>
        {Object.entries(previewMap).map(([componentKey, Component]) => (
          <div css={widgetContainer} key={componentKey}>
            <span css={widgetTitle}>{widgetInfo[componentKey].title}</span>
            <div
              css={widget}
              draggable={true}
              unselectable="on"
              onDragStart={(e) => {
                const widgetData = {
                  w: 2,
                  h: 1,
                  component: componentKey,
                  maxH: widgetInfo[componentKey].maxH,
                  maxW: widgetInfo[componentKey].maxW,
                  minH: widgetInfo[componentKey].minH,
                  minW: widgetInfo[componentKey].minW,
                }

                e.dataTransfer.setData('widgetData', JSON.stringify(widgetData))
              }}
            >
              <Component />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WidgetList

const container = (theme: Theme) => css`
  width: 350px;
  height: 100%;
  background-color: ${theme.widgetListBackground};
`

const wigetWrap = (theme: Theme) => css`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
  height: 100%;
  padding: 10px;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.scrollbarThumb};
  }

  &::-webkit-scrollbar-track {
    background-color: ${theme.scrollbarTrack};
    border: 2px solid ${theme.scrollbarTrackBorder};
  }
`

const widgetContainer = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const widget = (theme: Theme) => css`
  width: 100%;
  height: 100px;
  border: 3px solid ${theme.previewPanelBorder};
  border-radius: 16px;
`

const widgetTitle = (theme: Theme) => css`
  font-size: ${Common.fontSize.fs7};
  color: ${theme.widgetListTitleText};
`
