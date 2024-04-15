import { AlertButtonType, AlertNotificationType } from './enum'

export const LOGIN_FAILED_ALERT = {
  icon: '🔒',
  title: '로그인 실패',
  content: '이메일 또는 비밀번호가 잘못 입력 되었습니다. \n이메일과 비밀번호를 정확히 입력해 주세요.',
  buttonType: AlertButtonType.Close,
  notiType: AlertNotificationType.Error,
}
