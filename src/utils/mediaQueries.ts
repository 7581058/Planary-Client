import { PREVIEW_BREAK_POINTS } from '@/constants/breakpoints'

export const previewmq = PREVIEW_BREAK_POINTS.map((bp) => `@media (min-width: ${bp}px)`)
