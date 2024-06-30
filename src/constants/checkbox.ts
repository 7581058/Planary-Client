import { CheckBoxType } from './enum'

export const SIGNUP_CHECKBOX = [
  {
    id: 'allAgree',
    label: '필수 및 선택 항목을 모두 포함하여 동의합니다.',
    type: CheckBoxType.Parents,
  },
  {
    id: 'agree01',
    label: '[필수] 개인정보 수집 및 이용 동의',
    type: CheckBoxType.Child,
  },
  {
    id: 'agree02',
    label: '[필수] 서비스 이용약관 동의',
    type: CheckBoxType.Child,
  },
  {
    id: 'agree03',
    label: '[선택] 마케팅 정보 수신 동의',
    type: CheckBoxType.Child,
  },
]
