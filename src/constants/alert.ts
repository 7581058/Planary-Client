import { AlertButtonType } from '@/store/alertState'

export const LOGIN_FAILED_ALERT = {
  title: '로그인 실패',
  content: '로그인에 실패했습니다. 올바른 이메일과 비밀번호를 입력해주세요.',
  type: AlertButtonType.Close,
}
