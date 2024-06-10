import { atom } from 'recoil'

export type ModalType = {
  isOpen: boolean
  content: string | JSX.Element
}

export const currentModalState = atom<ModalType>({
  key: 'currentModalState',
  default: {
    isOpen: false,
    content: '',
  },
})
