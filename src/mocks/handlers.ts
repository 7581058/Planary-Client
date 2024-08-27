import { commonHandlers } from './common.handler'
import { dashboardHandlers } from './dashboard.handler'
import { ddayHandlers } from './dday.handler'
import { passthroughHandlers } from './passthrough.handler'

export const handlers = [...commonHandlers, ...dashboardHandlers, ...ddayHandlers, ...passthroughHandlers]
