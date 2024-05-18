import { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { LiaCoinsSolid } from 'react-icons/lia'

import { Common } from '@/styles/common'
const ProfilePreview = () => {
  return (
    <div css={container}>
      <div css={leftWrap}>
        <div css={img}></div>
      </div>
      <div css={rightWrap}>
        <div css={titleWrap}>
          <div css={userTitle}>타이틀1</div>
          <div css={userTitle}>타이틀2</div>
        </div>
        <span css={userName}>Name</span>
        <div css={levelWrap}>
          <div css={levelBackground}></div>
          <div css={levelBar}>1 level</div>
        </div>
        <div css={infoWrap}>
          <div css={wallet}>
            <LiaCoinsSolid />
            보유 코인: 0 코인
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePreview

const container = css`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 4px;
`

const leftWrap = css`
  flex-basis: 0;
  flex-grow: 1;
  width: 100%;
  height: 100%;
`

const img = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  background-color: ${theme.previewSubText};
  border-radius: 50%;
`

const rightWrap = css`
  display: flex;
  flex-basis: 0;
  flex-direction: column;
  flex-grow: 2.5;
  gap: 4px;

  width: 100%;
  height: 100%;
  padding: 5px;
`

const titleWrap = css`
  display: flex;
  gap: 10px;
`

const userTitle = (theme: Theme) => css`
  width: fit-content;
  padding: 2px;

  color: ${theme.previewPointText};

  background-color: ${theme.previewSubText2};
  border: 1px solid ${theme.previewPointText};
  border-radius: 4px;
`

const userName = (theme: Theme) => css`
  font-size: ${Common.fontSize.fs14};
  color: ${theme.previewText};
`

const levelWrap = css`
  position: relative;
`

const levelBackground = (theme: Theme) => css`
  width: 100%;
  height: 20px;
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
  height: 20px;
  padding-left: 10px;

  font-size: ${Common.fontSize.fs8};
  color: ${theme.previewSubText2};

  background-color: ${theme.previewPointText};
  border-radius: 10px;
`

const infoWrap = css`
  display: flex;
`

const wallet = (theme: Theme) => css`
  display: flex;
  align-items: center;

  width: fit-content;
  padding: 2px;

  font-size: ${Common.fontSize.fs8};
  color: ${theme.previewText};

  border-radius: 4px;
`
