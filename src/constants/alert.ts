import { AlertButtonType, AlertNotificationType } from './enum'

export const COMMON_FAILED_ALERT = {
  icon: '🚨',
  title: '오류 발생',
  content: '예상치 못한 오류가 발생했습니다. \n잠시 후 다시 시도해주세요.',
  buttonType: AlertButtonType.Close,
  notiType: AlertNotificationType.Error,
}

export const LOGIN_FAILED_ALERT = {
  icon: '🔒',
  title: '로그인 실패',
  content: '이메일 또는 비밀번호가 잘못 입력 되었습니다. \n이메일과 비밀번호를 정확히 입력해 주세요.',
  buttonType: AlertButtonType.Close,
  notiType: AlertNotificationType.Error,
}

export const SIGNUP_FAILED_ALERT = {
  icon: '🚨',
  title: '회원가입 실패',
  content: '회원가입에 실패했습니다. \n잠시 후 다시 시도해주세요.',
  buttonType: AlertButtonType.Close,
  notiType: AlertNotificationType.Error,
}

export const SIGNUP_SUCCESS_ALERT = {
  icon: '👌',
  title: '회원가입 성공',
  content: '회원가입을 완료했습니다. \n로그인 화면으로 이동됩니다.',
  buttonType: AlertButtonType.Ok,
  notiType: AlertNotificationType.Success,
  buttonTitle: '확인',
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

export const DDAY_GET_ERROR = {
  icon: '🚨',
  title: '불러오기 오류',
  content: '디데이 불러오기에 실패했습니다. 잠시 후 다시 시도해 주세요.',
  buttonType: AlertButtonType.None,
  notiType: AlertNotificationType.Error,
}

export const DDAY_ADD_FAILED_ALERT = {
  icon: '🚨',
  title: '디데이 추가 실패',
  content: '디데이 추가에 실패했습니다. \n잠시 후 다시 시도해주세요.',
  buttonType: AlertButtonType.Close,
  notiType: AlertNotificationType.Error,
}

export const DDAY_DELETE_FAILED_ALERT = {
  icon: '🚨',
  title: '디데이 삭제 실패',
  content: '디데이 삭제에 실패했습니다. \n잠시 후 다시 시도해주세요.',
  buttonType: AlertButtonType.Close,
  notiType: AlertNotificationType.Error,
}

export const DDAY_UPDATE_FAILED_ALERT = {
  icon: '🚨',
  title: '디데이 수정 실패',
  content: '디데이 수정에 실패했습니다. \n잠시 후 다시 시도해주세요.',
  buttonType: AlertButtonType.Close,
  notiType: AlertNotificationType.Error,
}

export const DDAY_UPDATE_CAROUSEL_FAILED_ALERT = {
  icon: '🚨',
  title: '디데이 자동 재생 변경 실패',
  content: '디데이 자동 재생 변경에 실패했습니다. \n잠시 후 다시 시도해주세요.',
  buttonType: AlertButtonType.Close,
  notiType: AlertNotificationType.Error,
}

export const DDAY_UPDATE_CAROUSEL_SUCCESS_ALERT = {
  icon: '👌',
  title: '디데이 자동 재생 변경 완료',
  content: '',
  buttonType: AlertButtonType.None,
  notiType: AlertNotificationType.Success,
}

export const DDAY_UPDATE_ORDER_FAILED_ALERT = {
  icon: '🚨',
  title: '디데이 순서 변경 실패',
  content: '디데이 순서 변경에 실패했습니다. \n잠시 후 다시 시도해주세요.',
  buttonType: AlertButtonType.None,
  notiType: AlertNotificationType.Error,
}

export const DDAY_UPDATE_ORDER_SUCCESS_ALERT = {
  icon: '👌',
  title: '디데이 순서 변경 완료',
  content: '',
  buttonType: AlertButtonType.None,
  notiType: AlertNotificationType.Success,
}

export const DASHBOARD_GET_ERROR = {
  icon: '🚨',
  title: '불러오기 오류',
  content: '대시보드 불러오기에 실패했습니다. 잠시 후 다시 시도해 주세요.',
  buttonType: AlertButtonType.None,
  notiType: AlertNotificationType.Error,
}

export const DASHBOARD_ADD_FAILED_ALERT = {
  icon: '🚨',
  title: '대시보드 추가 실패',
  content: '대시보드 추가에 실패했습니다. \n잠시 후 다시 시도해주세요.',
  buttonType: AlertButtonType.Close,
  notiType: AlertNotificationType.Error,
}

export const DASHBOARD_DELETE_COMFIRM_ALERT = {
  icon: '🔔',
  title: '대시보드를 삭제하시겠습니까?',
  content: '저장된 대시보드 정보가 전부 삭제되며 복구할 수 없습니다. \n정말 삭제하시겠습니까?',
  buttonType: AlertButtonType.CloseAndOk,
  notiType: AlertNotificationType.Warning,
}

export const DASHBOARD_DELETE_FAIL_ALERT = {
  icon: '🚨',
  title: '대시보드 삭제 실패',
  content: '대시보드 삭제에 실패했습니다. \n잠시 후 다시 시도해주세요.',
  buttonType: AlertButtonType.Close,
  notiType: AlertNotificationType.Error,
}

export const DASHBOARD_DELETE_SUCCESS_ALERT = {
  icon: '👌',
  title: '대시보드 삭제 완료',
  content: '',
  buttonType: AlertButtonType.None,
  notiType: AlertNotificationType.Success,
}

export const DASHBOARD_UPDATE_CONFIRM_ALERT = {
  icon: '🔔',
  title: '대시보드 편집 내역 미저장',
  content: '편집 내역이 저장되지 않은 대시보드가 있습니다. \n저장하지 않고 이동하시겠습니까?',
  buttonType: AlertButtonType.CloseAndOk,
  notiType: AlertNotificationType.Warning,
}

export const DASHBOARD_TITLE_UPDATE_SUCCESS_ALERT = {
  icon: '👌',
  title: '대시보드 타이틀 수정 완료',
  content: '',
  buttonType: AlertButtonType.None,
  notiType: AlertNotificationType.Success,
}
