import { useRecoilState } from 'recoil'

import { currentModalState } from '@/store/modalState'

export const useModal = () => {
  const [modalState, setModalState] = useRecoilState(currentModalState)

  const closeModal = () => {
    setModalState((prev) => {
      return { ...prev, isOpen: false }
    })
  }

  const openModal = (content: string | JSX.Element) => {
    setModalState({
      isOpen: true,
      content: content,
    })
  }

  return { modalState, closeModal, openModal }
}
