import DdaySetting from '@/components/modal/DdaySetting'

export interface ModalMap {
  component: () => JSX.Element
  hasAsync: boolean
}

export const modalMap: { [key: string]: ModalMap } = {
  dday: { component: DdaySetting, hasAsync: true },
}
