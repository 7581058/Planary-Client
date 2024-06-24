import { atom } from 'recoil'

export type ModalType = {
  isOpen: boolean
  content: string | JSX.Element
  hasAsync: boolean
}

export const currentModalState = atom<ModalType>({
  key: 'currentModalState',
  default: {
    isOpen: false,
    hasAsync: false,
    content: '',
  },
})
