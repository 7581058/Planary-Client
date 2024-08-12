import {
  WIDGET_CALENDAR_MAXH,
  WIDGET_CALENDAR_MAXW,
  WIDGET_CALENDAR_MINH,
  WIDGET_CALENDAR_MINW,
  WIDGET_CLOCK_MAXH,
  WIDGET_CLOCK_MAXW,
  WIDGET_CLOCK_MINH,
  WIDGET_CLOCK_MINW,
  WIDGET_DDAY_MAXH,
  WIDGET_DDAY_MAXW,
  WIDGET_DDAY_MINH,
  WIDGET_DDAY_MINW,
  WIDGET_PLAYER_MAXH,
  WIDGET_PLAYER_MAXW,
  WIDGET_PLAYER_MINH,
  WIDGET_PLAYER_MINW,
  WIDGET_PROFILE_MAXH,
  WIDGET_PROFILE_MAXW,
  WIDGET_PROFILE_MINH,
  WIDGET_PROFILE_MINW,
  WIDGET_TIMER_MAXH,
  WIDGET_TIMER_MAXW,
  WIDGET_TIMER_MINH,
  WIDGET_TIMER_MINW,
  WIDGET_TODO_MAXH,
  WIDGET_TODO_MAXW,
  WIDGET_TODO_MINH,
  WIDGET_TODO_MINW,
} from '@/constants/widget'

export interface LayoutDataType {
  i: string
  x: number
  y: number
  w: number
  h: number
  minW: number
  maxW: number
  minH: number
  maxH: number
  component: string
}
// 대시보드
///TODO: 반응형작업 md 등 추가 필요
export const layoutData = [
  {
    i: '0',
    x: 0,
    y: 0,
    w: 3,
    h: 1,
    minW: WIDGET_PROFILE_MINW,
    maxW: WIDGET_PROFILE_MAXW,
    minH: WIDGET_PROFILE_MINH,
    maxH: WIDGET_PROFILE_MAXH,
    component: 'profile',
  },
  {
    i: '1',
    x: 3,
    y: 0,
    w: 2,
    h: 1,
    minW: WIDGET_CLOCK_MINW,
    maxW: WIDGET_CLOCK_MAXW,
    minH: WIDGET_CLOCK_MINH,
    maxH: WIDGET_CLOCK_MAXH,
    component: 'clock',
  },
  {
    i: '2',
    x: 5,
    y: 0,
    w: 2,
    h: 1,
    minW: WIDGET_PLAYER_MINW,
    maxW: WIDGET_PLAYER_MAXW,
    minH: WIDGET_PLAYER_MINH,
    maxH: WIDGET_PLAYER_MAXH,
    component: 'player',
  },
  {
    i: '3',
    x: 0,
    y: 1,
    w: 3,
    h: 3,
    minW: WIDGET_CALENDAR_MINW,
    maxW: WIDGET_CALENDAR_MAXW,
    minH: WIDGET_CALENDAR_MINH,
    maxH: WIDGET_CALENDAR_MAXH,
    component: 'calendar',
  },
  {
    i: '4',
    x: 3,
    y: 1,
    w: 2,
    h: 3,
    minW: WIDGET_TODO_MINW,
    maxW: WIDGET_TODO_MAXW,
    minH: WIDGET_TODO_MINH,
    maxH: WIDGET_TODO_MAXH,
    component: 'todo',
  },
  {
    i: '5',
    x: 5,
    y: 1,
    w: 2,
    h: 1,
    minW: WIDGET_DDAY_MINW,
    maxW: WIDGET_DDAY_MAXW,
    minH: WIDGET_DDAY_MINH,
    maxH: WIDGET_DDAY_MAXH,
    component: 'dday',
  },
  {
    i: '6',
    x: 5,
    y: 2,
    w: 2,
    h: 2,
    minW: WIDGET_TIMER_MINW,
    maxW: WIDGET_TIMER_MAXW,
    minH: WIDGET_TIMER_MINH,
    maxH: WIDGET_TIMER_MAXH,
    component: 'timer',
  },
]

export const layoutData2 = [
  {
    i: '0',
    x: 0,
    y: 0,
    w: 3,
    h: 1,
    minW: WIDGET_PROFILE_MINW,
    maxW: WIDGET_PROFILE_MAXW,
    minH: WIDGET_PROFILE_MINH,
    maxH: WIDGET_PROFILE_MAXH,
    component: 'profile',
  },
  {
    i: '1',
    x: 3,
    y: 0,
    w: 2,
    h: 1,
    minW: WIDGET_DDAY_MINW,
    maxW: WIDGET_DDAY_MAXW,
    minH: WIDGET_DDAY_MINH,
    maxH: WIDGET_DDAY_MAXH,
    component: 'dday',
  },
  {
    i: '2',
    x: 5,
    y: 0,
    w: 2,
    h: 1,
    minW: WIDGET_PLAYER_MINW,
    maxW: WIDGET_PLAYER_MAXW,
    minH: WIDGET_PLAYER_MINH,
    maxH: WIDGET_PLAYER_MAXH,
    component: 'player',
  },
  {
    i: '3',
    x: 0,
    y: 1,
    w: 3,
    h: 3,
    minW: WIDGET_CALENDAR_MINW,
    maxW: WIDGET_CALENDAR_MAXW,
    minH: WIDGET_CALENDAR_MINH,
    maxH: WIDGET_CALENDAR_MAXH,
    component: 'calendar',
  },
  {
    i: '4',
    x: 3,
    y: 1,
    w: 2,
    h: 3,
    minW: WIDGET_TODO_MINW,
    maxW: WIDGET_TODO_MAXW,
    minH: WIDGET_TODO_MINH,
    maxH: WIDGET_TODO_MAXH,
    component: 'todo',
  },

  {
    i: '5',
    x: 5,
    y: 1,
    w: 2,
    h: 1,
    minW: WIDGET_CLOCK_MINW,
    maxW: WIDGET_CLOCK_MAXW,
    minH: WIDGET_CLOCK_MINH,
    maxH: WIDGET_CLOCK_MAXH,
    component: 'clock',
  },

  {
    i: '6',
    x: 5,
    y: 2,
    w: 2,
    h: 2,
    minW: WIDGET_TIMER_MINW,
    maxW: WIDGET_TIMER_MAXW,
    minH: WIDGET_TIMER_MINH,
    maxH: WIDGET_TIMER_MAXH,
    component: 'timer',
  },
]
