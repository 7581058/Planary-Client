import { css, Theme } from '@emotion/react'

import SigninForm from '@/components/SigninForm'
import { Common, flexCenter } from '@/styles/common'

const SignIn = () => {
  return (
    <div css={container}>
      <div css={[wrap]}>
        <div css={adContainer}>
          <img src="/src/assets/test_ad_2.png" alt="" />
        </div>
        <div css={signinContainer}>
          <img css={logo} src="/src/assets/logo_black.svg" alt="planary" />
          <SigninForm />
          <p css={text}>
            Don't have an account?
            <a href="#" css={signupButton}>
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn

const container = (theme: Theme) => css`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  ${flexCenter}

  background-color: ${theme.background};
`

const wrap = (theme: Theme) => css`
  display: flex;
  align-items: center;

  box-sizing: border-box;
  padding: 40px;

  background-color: ${theme.panel};
  border: 5px solid ${theme.border};
  border-radius: 16px;
`
//TODO: 미디어쿼리
const adContainer = css`
  box-sizing: border-box;
  width: 864px;
  height: 486px;
  ${flexCenter}
  img {
    width: 100%;
    height: 100%;
  }
`

const signinContainer = css`
  flex-direction: column;

  box-sizing: border-box;
  width: 400px;
  height: 486px;
  ${flexCenter}

  padding: 40px;
`

const logo = css`
  width: 230px;
  height: 80px;
`

const signupButton = css`
  margin-left: 5px;
  font-weight: 700;
`

const text = css`
  margin-top: 20px;
  font-size: ${Common.fontSize.fs8};
  font-weight: 300;
`
