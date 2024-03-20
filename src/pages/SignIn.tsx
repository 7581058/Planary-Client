import { css, Theme } from '@emotion/react'

import { Common, glassPanel } from '@/styles/common'

const SignIn = () => {
  return (
    <div css={container}>
      <div css={[wrap, glassPanel]}>
        <img css={logo} src="/src/assets/logo_default_clear.svg" alt="planary" />
        <form css={formWrap}>
          <label css={inputLabel}>E-mail</label>
          <input type="text" css={input} />
          <label css={inputLabel}>Password</label>
          <input type="password" css={input} />
          <button type="submit" css={signinButton}>
            SignIn
          </button>
        </form>
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

const formWrap = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const input = (theme: Theme) => css`
  width: 70%;
  height: 3rem;
  box-sizing: border-box;
  background-color: transparent;
  border-bottom: 3px solid rgba(255, 255, 255, 0.3);
  font-size: ${Common.fontSize.fs10};
  color: ${theme.text};
`

const inputLabel = css`
  width: 70%;
  color: ${Common.colors.white};
  font-weight: 700;
  text-align: left;
  margin-top: 20px;
  font-size: ${Common.fontSize.fs10};
`

const signinButton = (theme: Theme) => css`
  width: 70%;
  height: 3rem;
  background-color: ${theme.button};
  color: ${theme.buttonText};
  margin-top: 5rem;
  font-size: ${Common.fontSize.fs12};
  cursor: pointer;
  &:hover {
    scale: 1.01;
  }
`

const signupButton = (theme: Theme) => css`
  color: ${theme.buttonText};
  margin-left: 5px;
`

const text = css`
  font-size: ${Common.fontSize.fs8};
`
