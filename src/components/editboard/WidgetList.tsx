import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import SubHeader from './SubHeader'

import { widgetInfo, widgetMap } from '@/constants/widget'
import { Common } from '@/styles/common'

const WidgetList = () => {
  return (
    <div css={container}>
      <SubHeader title="위젯" />
      <div css={wigetWrap}>
        {Object.entries(widgetMap).map(([componentKey, Preview]) => (
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
              <Preview isPreview={true} w={0} h={0} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WidgetList

const container = css`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  width: 200px;
  height: 100%;
`

const wigetWrap = (theme: Theme) => css`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.scrollbarThumb};
    border-radius: 4px;
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

  background-color: ${theme.previewPanelBackground};
  border: 3px solid ${theme.previewPanelBorder};
  border-radius: 16px;
`

const widgetTitle = (theme: Theme) => css`
  font-size: ${Common.fontSize.fs7};
  color: ${theme.widgetListTitleText};
`
