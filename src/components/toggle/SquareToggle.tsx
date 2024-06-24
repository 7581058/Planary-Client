import { css, useTheme } from '@emotion/react'
import { Theme } from '@emotion/react'

import { Common, noDrag } from '@/styles/common'

interface SquareToggleProps {
  auto: boolean
  handleClickToggle: () => void
}

const SquareToggle = ({ auto, handleClickToggle }: SquareToggleProps) => {
  const theme = useTheme()
  return (
    <div css={[toggleWrap, noDrag]} onClick={handleClickToggle}>
      <div css={toggleButton(theme, auto)}></div>
      <div css={toggleLabel(theme, auto)}>ON</div>
      <div css={toggleLabel(theme, auto)}>OFF</div>
    </div>
  )
}

export default SquareToggle

const toggleWrap = (theme: Theme) => css`
  cursor: pointer;

  position: relative;

  display: flex;
  align-items: center;

  width: 60px;
  height: 20px;

  background-color: ${theme.toggleButtonBackground};
  border-radius: 4px;
`

const toggleButton = (theme: Theme, isAuto: boolean) => css`
  position: absolute;
  left: ${isAuto ? 'calc(100% - 30px)' : '0'};

  width: 30px;
  height: 20px;

  background-color: ${isAuto ? theme.toggleButtonActive : theme.toggleButton};
  border-radius: 4px;

  transition:
    left 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
`

const toggleLabel = (theme: Theme, isAuto: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;

  font-size: ${Common.fontSize.fs7};
  font-weight: 700;
  color: ${isAuto ? theme.toggleButtonActive : theme.toggleButton};
`
