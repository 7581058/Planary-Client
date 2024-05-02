import { Theme } from '@emotion/react'
import { css } from '@emotion/react'

const WidgetList = () => {
  return <div css={container}>WidgetList</div>
}

export default WidgetList

const container = (theme: Theme) => css`
  width: 250px;
  height: 100%;
  background-color: ${theme.widgetListBackground};
`
