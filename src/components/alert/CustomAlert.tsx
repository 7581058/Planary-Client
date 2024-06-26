import { css, keyframes, useTheme } from '@emotion/react'
import { Theme } from '@emotion/react'
import { useEffect } from 'react'

import { AlertButtonType, AlertNotificationType } from '@/constants/enum'
import { useAlert } from '@/hooks/useAlert'
import { Common } from '@/styles/common'

const CustomAlert = () => {
  const theme = useTheme()
  const { alertState, closeAlert } = useAlert()

  useEffect(() => {
    if (alertState.buttonType === AlertButtonType.None) {
      const timeoutId = setTimeout(() => {
        closeAlert()
      }, 1500)

      return () => clearTimeout(timeoutId)
    }
  }, [alertState.buttonType, closeAlert])

  const handleClickCallBack = () => {
    if (alertState.callBack) {
      alertState.callBack()
    }
    closeAlert()
  }

  return (
    <div css={alertContainer(theme, alertState.isOpen)}>
      {alertState.icon && <div>{alertState.icon}</div>}
      <div css={titleWrap}>{alertState.title}</div>
      <div css={contentWrap}>{alertState.content}</div>
      <div css={buttonWrap}>
        {alertState.buttonType === AlertButtonType.CloseAndOk && (
          <>
            <button onClick={closeAlert} css={alertButton}>
              취소
            </button>
            <button onClick={handleClickCallBack} css={[alertButton, okButton]}>
              확인
            </button>
          </>
        )}
        {alertState.buttonType === AlertButtonType.Ok && (
          <button onClick={handleClickCallBack} css={[alertButton, alertColor(theme, alertState.notiType)]}>
            {alertState.buttonTitle}
          </button>
        )}
        {alertState.buttonType === AlertButtonType.Close && (
          <button onClick={closeAlert} css={[alertButton, alertColor(theme, alertState.notiType)]}>
            닫기
          </button>
        )}
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
  gap: 10px;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  height: fit-content;
  margin: 0 auto;
  padding: 10px 30px;

  visibility: ${isOpen ? 'visible' : 'hidden'};
  background-color: ${theme.alertBackground};
  border: 1px solid ${theme.border};
  border-radius: 16px;

  transition: visibility 0.3s ease-out;
  animation: ${isOpen ? fadeIn : fadeOut} 0.3s;
`

const alertColor = (theme: Theme, notiType: AlertNotificationType) => {
  let borderColor

  switch (notiType) {
    case AlertNotificationType.Error:
      borderColor = theme.errorRed
      break
    case AlertNotificationType.Success:
      borderColor = theme.successBlue
      break
    case AlertNotificationType.Info:
      borderColor = theme.infoGreen
      break
    case AlertNotificationType.Warning:
      borderColor = theme.warningYellow
      break
    default:
      return null
  }
  return css`
    color: ${borderColor};
    border: 1px solid ${borderColor};
  `
}

const alertButton = (theme: Theme) => css`
  cursor: pointer;

  padding: 5px 20px;

  background-color: ${theme.alertButtonBackground};
  border: 1px solid ${theme.alertButtonBoard};
  border-radius: 4px;
`
const okButton = (theme: Theme) => css`
  color: ${theme.alertOkButtonText};
  background-color: ${theme.alertOkButton};
`

const fadeOut = keyframes`
  from { top: 30px; opacity: 1; } 
  to { top: 0; opacity: 0; }
`

const fadeIn = keyframes`
  from { top: 0; opacity: 0; }
  to { top: 30px; opacity: 1; }
`

const buttonWrap = css`
  display: flex;
  gap: 10px;
`

const titleWrap = css`
  font-size: ${Common.fontSize.fs10};
  font-weight: 700;
`

const contentWrap = css`
  text-align: center;
  white-space: pre-wrap;
`
