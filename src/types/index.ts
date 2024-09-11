export interface LoginRequestBody {
  email: string
  password: string
}

export interface SignUpRequestBody {
  username: string
  birth: string
  email: string
  password: string
  agree: boolean
}

export interface DashboardRequestBody {
  title: string
  theme: string
  userId: number
}
export interface DdayPostRequestBody {
  icon: number
  title: string
  date: string
}
export interface DdayRequestBody extends DdayPostRequestBody {
  widgetId: number
}

export interface DdayCarouselSettingsRequestBody {
  isAuto: number
}

export interface DdayOrderUpdateRequestBody {
  id: number
  order: number
}
