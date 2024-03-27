import { css, Theme } from '@emotion/react'

import SigninForm from '@/components/SigninForm'
import { Common, flexCenter, glassPanel } from '@/styles/common'

const SignIn = () => {
  return (
    <div css={container}>
      <div css={[wrap, glassPanel]}>
        <div css={adContainer}>ad</div>
        <div css={signinContainer}>
          <img css={logo} src="/src/assets/logo_default_clear.svg" alt="planary" />
          <SigninForm />
          <p css={text}>
            Don't have an account?
            <a href="#" css={signupButton}>
              SignUp here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn

const container = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url('/src/assets/bg.webp');
  background-size: cover;
  background-position: center;
  ${flexCenter}
`

const wrap = css`
  width: 90%;
  height: 85%;
  display: flex;
  align-items: center;
  border-radius: 32px;
  padding: 40px;
`

const adContainer = css`
  width: 100%;
  height: 100%;
  border: 1px solid #fff;
  flex-grow: 2;
  flex-basis: 0;
  box-sizing: border-box;
  ${flexCenter}
`

const signinContainer = css`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  flex-basis: 0;
  ${flexCenter}
  flex-direction: column;
  box-sizing: border-box;
`

const logo = css`
  width: 230px;
  height: 80px;
`

const signupButton = (theme: Theme) => css`
  color: ${theme.buttonText};
  margin-left: 5px;
`

const text = css`
  font-size: ${Common.fontSize.fs8};
`
