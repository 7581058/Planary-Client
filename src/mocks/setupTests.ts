import { afterAll, afterEach, beforeAll } from 'vitest'
import { mswSetupServer } from './server'

beforeAll(() => mswSetupServer.listen())
afterEach(() => mswSetupServer.restoreHandlers())
afterAll(() => mswSetupServer.close())
