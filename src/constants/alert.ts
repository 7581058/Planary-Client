import { AlertButtonType, AlertNotificationType } from './enum'

export const LOGIN_FAILED_ALERT = {
  icon: '🔒',
  title: '로그인 실패',
  content: '이메일 또는 비밀번호가 잘못 입력 되었습니다. \n이메일과 비밀번호를 정확히 입력해 주세요.',
  buttonType: AlertButtonType.Close,
  notiType: AlertNotificationType.Error,
}

export const BOARD_EDIT_SAVE_WARNING = {
  icon: '🚨',
  title: '경고',
  content:
    '변경 사항이 저장되지 않았습니다. \n변경 사항을 저장하지 않고 이동하면 변경된 내용이 손실됩니다. \n계속하시겠습니까?',
  buttonType: AlertButtonType.Close,
  notiType: AlertNotificationType.Warning,
}

export const BOARD_EDIT_SAVE_FAILED = {
  icon: '🚨',
  title: '경고',
  content: '저장에 실패했습니다. 잠시 후 다시 시도해 주세요.',
  buttonType: AlertButtonType.Close,
  notiType: AlertNotificationType.Error,
}

export const BOARD_EDIT_SAVE_SUCCESS = {
  icon: '👌',
  title: '저장 완료',
  content: '저장을 완료했습니다.',
  buttonType: AlertButtonType.None,
  notiType: AlertNotificationType.Success,
}

export const BOARD_EDIT_RESIZING_ERROR = {
  icon: '❌',
  title: '변경 불가',
  content: '변경할 수 없는 크기 입니다.',
  buttonType: AlertButtonType.None,
  notiType: AlertNotificationType.Error,
}
