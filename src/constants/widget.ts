import Clock from '@/components/widget/Clock'
import ClockPreview from '@/components/widget/ClockPreview'

interface ComponentMap {
  [key: string]: () => JSX.Element
}

export const componentMap: ComponentMap = {
  clock: Clock,
}

export const previewMap: ComponentMap = {
  clock: ClockPreview,
}
