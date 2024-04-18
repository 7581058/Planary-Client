import Clock from '@/components/widget/Clock'

interface ComponentMap {
  [key: string]: () => JSX.Element
}

export const componentMap: ComponentMap = {
  clock: Clock,
}
