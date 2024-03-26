import { css, Theme } from '@emotion/react'

import SigninForm from '@/components/SigninForm'
import { Common, glassPanel } from '@/styles/common'

const SignIn = () => {
  return (
    <div css={container}>
      <div css={[wrap, glassPanel]}>
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
  display: flex;
  align-items: center;
  justify-content: end;
`

const wrap = css`
  width: 35%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 50px;
`

const logo = css`
  width: 230px;
  height: 80px;
  margin-top: 5rem;
`

const signupButton = (theme: Theme) => css`
  color: ${theme.buttonText};
  margin-left: 5px;
`

const text = css`
  font-size: ${Common.fontSize.fs8};
`
