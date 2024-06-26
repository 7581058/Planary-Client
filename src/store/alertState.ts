import { atom } from 'recoil'

import { AlertButtonType, AlertNotificationType } from '@/constants/enum'

export type AlertType = {
  isOpen: boolean
  icon?: string
  title: string
  content: string | JSX.Element
  buttonType: AlertButtonType
  notiType: AlertNotificationType
  callBack?: () => void
  buttonTitle?: string
}

export const currentAlertState = atom<AlertType>({
  key: 'currentAlertState',
  default: {
    isOpen: false,
    title: '',
    content: '',
    buttonType: AlertButtonType.Close,
    notiType: AlertNotificationType.Default,
    buttonTitle: '',
  },
})
