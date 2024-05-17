import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { IoPlaySkipBack } from 'react-icons/io5'
import { IoPlaySkipForward } from 'react-icons/io5'
import { IoPlay } from 'react-icons/io5'
import { RiPlayListLine } from 'react-icons/ri'
import { RiShuffleLine } from 'react-icons/ri'
import { RxLoop } from 'react-icons/rx'

import { Common } from '@/styles/common'
const PlayerPreview = () => {
  return (
    <div css={container}>
      <div css={topWrap}>
        <div css={cover}></div>
        <div css={titleWrap}>
          <span css={title}>title</span>
          <span css={name}>name</span>
        </div>
      </div>
      <div css={bottomWrap}>
        <div css={timeWrap}>
          <span>1:08</span>
          <span>3:38</span>
        </div>
        <div css={progressWrap}>
          <div css={barBackground}></div>
          <div css={bar}></div>
          <div css={handle}></div>
        </div>
        <div css={controllerWrap}>
          <RiPlayListLine />
          <div css={rightWrap}>
            <RxLoop />
            <RiShuffleLine />
          </div>
          <div css={centerWrap}>
            <IoPlaySkipBack />
            <IoPlay />
            <IoPlaySkipForward />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerPreview

const container = css`
  display: flex;
  flex-direction: column;
  gap: 4px;

  width: 100%;
  height: 100%;
  padding: 4px;
`

const topWrap = css`
  display: flex;
  flex-basis: 0;
  flex-grow: 2;
  gap: 10px;

  width: 100%;
  height: 100%;
`

const cover = (theme: Theme) => css`
  flex-basis: 0;
  flex-grow: 1;

  width: 100%;
  height: 100%;

  background-color: ${theme.previewSubText};
`

const titleWrap = css`
  display: flex;
  flex-basis: 0;
  flex-direction: column;
  flex-grow: 1.5;

  width: 100%;
  height: 100%;
`

const title = css`
  width: 100%;
  font-size: ${Common.fontSize.fs10};
  font-weight: 700;
`

const name = (theme: Theme) => css`
  font-size: ${Common.fontSize.fs8};
  color: ${theme.previewText};
`

const bottomWrap = css`
  flex-basis: 0;
  flex-grow: 1;
  gap: 2px;

  width: 100%;
  height: 100%;
`

const timeWrap = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: ${Common.fontSize.fs6};
`

const progressWrap = css`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`

const barBackground = (theme: Theme) => css`
  width: 100%;
  height: 5px;
  background-color: ${theme.previewSubText};
`

const bar = (theme: Theme) => css`
  position: absolute;
  width: 30%;
  height: 5px;
  background-color: ${theme.previewText};
`

const handle = (theme: Theme) => css`
  position: absolute;
  left: 30%;

  width: 10px;
  height: 10px;

  background-color: ${theme.previewPointText};
  border-radius: 50%;
`

const controllerWrap = (theme: Theme) => css`
  position: relative;

  display: flex;
  justify-content: space-between;

  width: 100%;
  margin-top: 4px;

  font-size: ${Common.fontSize.fs12};
  color: ${theme.previewText};
`

const centerWrap = css`
  position: absolute;

  display: flex;
  gap: 5px;
  justify-content: center;

  width: 100%;
`
const rightWrap = css`
  display: flex;
  gap: 5px;
`
