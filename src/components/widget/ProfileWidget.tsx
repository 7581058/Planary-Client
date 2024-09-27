import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { IoPerson } from 'react-icons/io5'
import { LiaCoinsSolid } from 'react-icons/lia'

import { WidgetProps } from '@/constants/widget'
import { Common } from '@/styles/common'
const ProfileWidget = ({ w, h, isPreview }: WidgetProps) => {
  return (
    <div css={[container, responsiveContainer(w, h)]}>
      <div css={leftWrap}>
        <div css={[img, responsiveImg(w, h)]}>{isPreview ? <IoPerson /> : <div></div>}</div>
      </div>
      <div css={[rightWrap, responsiveRight(w, h)]}>
        <div css={[titleWrap, responsiveTitle(w, h)]}>
          {isPreview ? (
            <div css={userTitle}>Title</div>
          ) : (
            <>
              <div css={userTitle}>Title</div>
              <div css={userTitle}>Title</div>
            </>
          )}
        </div>
        <span css={[userName, responsiveName(w, h)]}>{isPreview ? 'Name' : 'Name'}</span>
        <div css={[levelWrap, responsiveLevelWrap(w, h)]}>
          <div css={levelBackground}></div>
          <div css={[levelBar, responsiveLevelBar(w, h)]}>{!isPreview && '1 level'}</div>
        </div>
        <div css={infoWrap}>
          <div css={[coin, responsiveCoin(w, h)]}>
            <LiaCoinsSolid />
            My Coin: {isPreview ? '0' : '11'} Coin
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileWidget

const container = css`
  display: flex;
  gap: 4px;

  width: 100%;
  height: 100%;
  padding: 4px;
`

const responsiveContainer = (w: number, h: number) => css`
  ${w === 2 && h === 2 && `flex-direction: column;`}
`

const leftWrap = css`
  display: flex;
  flex-basis: 0;
  flex-grow: 1;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`

const img = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  font-size: 32px;
  color: ${theme.widgetPreviewProfileIcon};

  background-color: ${theme.previewSubText};
  border-radius: 50%;
`

const responsiveImg = (w: number, h: number) => css`
  ${w === 0 &&
  h === 0 &&
  `width: 50px;
  height: 50px;`}
  ${w === 2 &&
  h === 1 &&
  `width: 80px;
  height: 80px;`}
  ${w === 3 &&
  h === 1 &&
  `width: 110px;
  height: 110px;`}
  ${w === 4 &&
  h === 1 &&
  `border-radius: 0;
  width: 100%;
  height: 100%;`}
  ${w === 2 &&
  h === 2 &&
  `border-radius: 0;
  width: 100%;
  height: 100%;`}
  ${w === 3 &&
  h === 2 &&
  `border-radius: 0;
  width: 100%;
  height: 100%;`}
  ${w === 4 &&
  h === 2 &&
  `border-radius: 0;
  width: 100%;
  height: 100%;`}
`

const rightWrap = css`
  display: flex;
  flex-basis: 0;
  flex-direction: column;
  flex-grow: 2.5;
  gap: 4px;
  justify-content: center;

  width: 100%;
  height: 100%;
`

const responsiveRight = (w: number, h: number) => css`
  ${w === 2 && h === 2 && `flex-grow: 1;gap: 5px;`}
  ${w === 3 && h === 2 && `flex-grow: 1;gap: 10px;`}
  ${w === 4 && h === 2 && `flex-grow: 1.5;gap: 15px;`}
`

const titleWrap = css`
  display: flex;
  gap: 5px;
`

const userTitle = (theme: Theme) => css`
  width: fit-content;
  padding: 2px;

  color: ${theme.previewPointText};

  background-color: ${theme.previewSubText2};
  border: 1px solid ${theme.previewPointText};
  border-radius: 4px;
`

const responsiveTitle = (w: number, h: number) => css`
  ${w === 0 && h === 0 && `font-size: ${Common.fontSize.fs6};`}
  ${w === 2 && h === 1 && `font-size: ${Common.fontSize.fs8};`}
  ${w === 3 && h === 1 && `font-size: ${Common.fontSize.fs8};`}
  ${w === 4 && h === 1 && `font-size: ${Common.fontSize.fs9};`}
  ${w === 2 && h === 2 && `font-size: ${Common.fontSize.fs9};`}
  ${w === 3 && h === 2 && `font-size: ${Common.fontSize.fs10};`}
  ${w === 4 && h === 2 && `font-size: ${Common.fontSize.fs12};`}
`

const userName = (theme: Theme) => css`
  font-size: ${Common.fontSize.fs14};
  color: ${theme.previewText};
`

const responsiveName = (w: number, h: number) => css`
  ${w === 0 && h === 0 && `font-size: ${Common.fontSize.fs10};`}
  ${w === 2 && h === 1 && `font-size: ${Common.fontSize.fs14};`}
  ${w === 3 && h === 1 && `font-size: ${Common.fontSize.fs14};`}
  ${w === 4 && h === 1 && `font-size: ${Common.fontSize.fs14};`}
  ${w === 2 && h === 2 && `font-size: ${Common.fontSize.fs14};`}
  ${w === 3 && h === 2 && `font-size: ${Common.fontSize.fs16};`}
  ${w === 4 && h === 2 && `font-size: ${Common.fontSize.fs18};`}
`

const levelWrap = css`
  position: relative;
  height: 20px;
`

const responsiveLevelWrap = (w: number, h: number) => css`
  ${w === 0 && h === 0 && `height: 5px;`}
  ${w === 2 && h === 1 && `height: 14px;`}
  ${w === 3 && h === 1 && `height: 20px;`}
  ${w === 4 && h === 1 && `height: 20px;`}
  ${w === 2 && h === 2 && `height: 20px;`}
  ${w === 3 && h === 2 && `height: 20px;`}
  ${w === 4 && h === 2 && `height: 20px;`}
`

const levelBackground = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  background-color: ${theme.previewSubText};
  border-radius: 10px;
`

const levelBar = (theme: Theme) => css`
  position: absolute;
  top: 0;

  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 30%;
  height: 100%;
  padding-left: 10px;

  font-size: ${Common.fontSize.fs8};
  color: ${theme.previewSubText2};

  background-color: ${theme.previewPointText};
  border-radius: 10px;
`
const responsiveLevelBar = (w: number, h: number) => css`
  ${w === 0 && h === 0 && `font-size: 0;`}
  ${w === 2 && h === 1 && `padding-left: 6px;font-size: ${Common.fontSize.fs7};`}
  ${w === 3 && h === 1 && `font-size: ${Common.fontSize.fs8};`}
  ${w === 4 && h === 1 && `font-size: ${Common.fontSize.fs8};`}
  ${w === 2 && h === 2 && `font-size: ${Common.fontSize.fs8};`}
  ${w === 3 && h === 2 && `padding-left: 8px;font-size: ${Common.fontSize.fs8};`}
  ${w === 4 && h === 2 && `font-size: ${Common.fontSize.fs10};`}
`

const infoWrap = css`
  display: flex;
`

const coin = (theme: Theme) => css`
  display: flex;
  align-items: center;

  width: fit-content;
  padding: 2px;

  font-size: ${Common.fontSize.fs8};
  color: ${theme.previewText};

  border-radius: 4px;
`

const responsiveCoin = (w: number, h: number) => css`
  ${w === 0 && h === 0 && `font-size: ${Common.fontSize.fs7};`}
  ${w === 2 && h === 1 && `font-size: ${Common.fontSize.fs8};`}
  ${w === 3 && h === 1 && `font-size: ${Common.fontSize.fs8};`}
  ${w === 4 && h === 1 && `font-size: ${Common.fontSize.fs9};`}
  ${w === 2 && h === 2 && `font-size: ${Common.fontSize.fs9};`}
  ${w === 3 && h === 2 && `font-size: ${Common.fontSize.fs10};`}
  ${w === 4 && h === 2 && `font-size: ${Common.fontSize.fs12};`}
`
