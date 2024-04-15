import { useRecoilState } from 'recoil'

import { AlertButtonType, currentAlertState } from '@/store/alertState'

type OpenAlertType = {
  title: string
  content: string | JSX.Element
  type: AlertButtonType
  callback?: () => void
}
export const useAlert = () => {
  const [alertState, setAlertState] = useRecoilState(currentAlertState)

  const closeAlert = () => {
    setAlertState((prev) => {
      return { ...prev, isOpen: false }
    })
  }

  const openAlert = ({ title, content, type, callback }: OpenAlertType) => {
    setAlertState({
      isOpen: true,
      type: type,
      title: title,
      content: content,
      callBack: callback,
    })
  }

  return { alertState, closeAlert, openAlert }
}
