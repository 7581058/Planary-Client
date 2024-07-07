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

export interface AddDdayRequestBody {
  icon: number
  title: string
  date: string
}
