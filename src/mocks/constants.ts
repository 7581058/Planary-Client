import { layoutData, layoutData2, LayoutDataType } from './data'

export const MSW_TEST_TOKEN = '12341234'

export const MSW_DASHBOARD_LAYOUTS: { [key: number]: LayoutDataType[] } = {
  1: layoutData,
  2: layoutData2,
}

// 테스트 고정 계정
export const MSW_TEST_ACCOUNTS = [
  { username: 'test', email: 'test@planary.com', password: '1q2w3e4r#', birth: '19950505', agree: true },
]
