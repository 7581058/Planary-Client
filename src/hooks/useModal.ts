import { useRecoilState } from 'recoil'

import { currentModalState } from '@/store/modalState'

type OpenModalType = {
  content: string | JSX.Element
}

export const useModal = () => {
  const [modalState, setModalState] = useRecoilState(currentModalState)

  const closeModal = () => {
    setModalState((prev) => {
      return { ...prev, isOpen: false }
    })
  }

  const openModal = ({ content }: OpenModalType) => {
    setModalState({
      isOpen: true,
      content: content,
    })
  }

  return { modalState, closeModal, openModal }
}
