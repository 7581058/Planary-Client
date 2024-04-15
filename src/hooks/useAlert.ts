import { useRecoilState } from 'recoil'

import { AlertButtonType, AlertNotificationType } from '@/constants/enum'
import { currentAlertState } from '@/store/alertState'

type OpenAlertType = {
  icon?: string
  title: string
  content: string | JSX.Element
  buttonType: AlertButtonType
  notiType: AlertNotificationType
  callback?: () => void
}

export const useAlert = () => {
  const [alertState, setAlertState] = useRecoilState(currentAlertState)

  const closeAlert = () => {
    setAlertState((prev) => {
      return { ...prev, isOpen: false }
    })
  }

  const openAlert = ({ icon, title, content, buttonType, notiType, callback }: OpenAlertType) => {
    setAlertState({
      isOpen: true,
      icon: icon,
      title: title,
      content: content,
      buttonType: buttonType,
      notiType: notiType,
      callBack: callback,
    })
  }

  return { alertState, closeAlert, openAlert }
}
