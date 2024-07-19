import { css } from '@emotion/react'
import { Theme } from '@emotion/react'

import PageHeader from '@/components/header/PageHeader'
import SignupForm from '@/components/SignupForm'
import { Common } from '@/styles/common'

const Signup = () => {
  return (
    <div css={container}>
      <PageHeader title="회원가입" />
      <div css={innerContainer}>
        <div css={logoWrap}>
          <img css={logo} src="/src/assets/logo_primary.svg" alt="planary" />
          <p css={sub}>Discover the Power of an Organized Life. Join Us Today!</p>
        </div>
        <div css={formWrap}>
          <SignupForm />
        </div>
      </div>
    </div>
  )
}

export default Signup

const container = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const formWrap = css`
  box-sizing: border-box;
  width: 500px;
  padding: 0 20px 50px;
`

const innerContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
`

const logo = css`
  width: 120px;
  height: 40px;
`

const sub = (theme: Theme) => css`
  margin: 0;
  font-size: ${Common.fontSize.fs8};
  color: ${theme.subText};
  text-align: center;
`

const logoWrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 40px;
  margin-bottom: 40px;
`
