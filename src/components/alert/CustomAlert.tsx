import { css, keyframes, useTheme } from '@emotion/react'
import { Theme } from '@emotion/react'

import { useAlert } from '@/hooks/useAlert'
import { AlertButtonType } from '@/store/alertState'

const CustomAlert = () => {
  const theme = useTheme()
  const { alertState, closeAlert } = useAlert()

  return (
    <div css={alertContainer(theme, alertState.isOpen)}>
      <div>{alertState.title}</div>
      <div>{alertState.content}</div>
      <div css={buttonWrap}>
        {alertState.type === AlertButtonType.CloseAndOk && <button onClick={alertState.callBack}>Ok</button>}
        {alertState.type === AlertButtonType.Close && <button onClick={closeAlert}>Close</button>}
      </div>
    </div>
  )
}

export default CustomAlert

const alertContainer = (theme: Theme, isOpen: boolean) => css`
  position: relative;
  z-index: 10;
  top: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: fit-content;
  margin: 0 auto;
  padding: 30px;

  visibility: ${isOpen ? 'visible' : 'hidden'};
  background-color: ${theme.alertBackground};

  transition: visibility 0.3s ease-out;
  animation: ${isOpen ? fadeIn : fadeOut} 0.3s;
`

const fadeOut = keyframes`
  from {top: 30px; opacity: 1;} 
  to {top: 0; opacity: 0;}
`

const fadeIn = keyframes`
  from {top: 0; opacity: 0;}
  to {top: 30px; opacity: 1;}
`

const buttonWrap = css`
  display: flex;
`
