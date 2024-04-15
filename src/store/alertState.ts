import { atom } from 'recoil'

type AlertType = {
  isOpen: boolean
  title: string
  content: string | JSX.Element
  type: AlertButtonType
  callBack?: () => void
}

export enum AlertButtonType {
  CloseAndOk,
  Close,
  None,
}

export const currentAlertState = atom<AlertType>({
  key: 'currentAlertState',
  default: {
    isOpen: false,
    title: '',
    content: '',
    type: AlertButtonType.Close,
  },
})
