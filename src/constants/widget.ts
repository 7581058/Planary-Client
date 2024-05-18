import CalendarPreview from '@/components/widget/CalendarPreview'
import Clock from '@/components/widget/Clock'
import ClockPreview from '@/components/widget/ClockPreview'
import DdayPreview from '@/components/widget/DdayPreview'
import PlayerPreview from '@/components/widget/PlayerPreview'
import ProfilePreview from '@/components/widget/ProfilePreview'
import TimerPreview from '@/components/widget/TimerPreview'
import TodoPreview from '@/components/widget/TodoPreview'

export interface WidgetProps {
  w: number
  h: number
}
interface ComponentMap {
  [key: string]: (props: WidgetProps) => JSX.Element
}

interface Info {
  title: string
  info: string
  maxH: number
  maxW: number
  minH: number
  minW: number
}
interface WidgetMap {
  [key: string]: Info
}

export const componentMap: ComponentMap = {
  clock: Clock,
}

export const previewMap: ComponentMap = {
  clock: ClockPreview,
  profile: ProfilePreview,
  dday: DdayPreview,
  timer: TimerPreview,
  todo: TodoPreview,
  player: PlayerPreview,
  calendar: CalendarPreview,
}

export const widgetInfo: WidgetMap = {
  clock: {
    title: '시계',
    info: '위젯 길이별 3가지 타입이 존재합니다.',
    maxH: 2,
    maxW: 2,
    minH: 1,
    minW: 1,
  },
  profile: {
    title: '내 정보',
    info: '타이틀, 레벨, 출석일 등이 표시됩니다.',
    maxH: 2,
    maxW: 4,
    minH: 1,
    minW: 2,
  },
  player: {
    title: '음악 재생',
    info: '음악 재생 플레이어 입니다.',
    maxH: 2,
    maxW: 4,
    minH: 1,
    minW: 1,
  },
  calendar: {
    title: '달력',
    info: '스케줄관리 또는 여러 기록을 관찰할 수 있습니다.',
    maxH: 3,
    maxW: 4,
    minH: 1,
    minW: 1,
  },
  todo: {
    title: '할일',
    info: '할 일을 작성하고 관리할 수 있습니다.',
    maxH: 3,
    maxW: 3,
    minH: 1,
    minW: 1,
  },
  dday: {
    title: '디데이',
    info: '디데이를 지정해 노출할 수 있습니다.',
    maxH: 2,
    maxW: 2,
    minH: 1,
    minW: 1,
  },
  timer: {
    title: '타이머',
    info: '뽀모도로 타이머 입니다. 자유롭게 시간, 알림 설정이 가능합니다.',
    maxH: 2,
    maxW: 2,
    minH: 1,
    minW: 1,
  },
}

export const WIDGET_PROFILE_MINW = 2
export const WIDGET_PROFILE_MAXW = 4
export const WIDGET_PROFILE_MINH = 1
export const WIDGET_PROFILE_MAXH = 2

export const WIDGET_CLOCK_MINW = 1
export const WIDGET_CLOCK_MAXW = 2
export const WIDGET_CLOCK_MINH = 1
export const WIDGET_CLOCK_MAXH = 2

export const WIDGET_PLAYER_MINW = 1
export const WIDGET_PLAYER_MAXW = 4
export const WIDGET_PLAYER_MINH = 1
export const WIDGET_PLAYER_MAXH = 2

export const WIDGET_CALENDAR_MINW = 1
export const WIDGET_CALENDAR_MAXW = 4
export const WIDGET_CALENDAR_MINH = 1
export const WIDGET_CALENDAR_MAXH = 3

export const WIDGET_TODO_MINW = 1
export const WIDGET_TODO_MAXW = 3
export const WIDGET_TODO_MINH = 1
export const WIDGET_TODO_MAXH = 3

export const WIDGET_DDAY_MINW = 1
export const WIDGET_DDAY_MAXW = 2
export const WIDGET_DDAY_MINH = 1
export const WIDGET_DDAY_MAXH = 2

export const WIDGET_TIMER_MINW = 1
export const WIDGET_TIMER_MAXW = 2
export const WIDGET_TIMER_MINH = 1
export const WIDGET_TIMER_MAXH = 2
