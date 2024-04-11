import { css } from '@emotion/react'
import { Theme } from '@emotion/react'
import { useRecoilValue } from 'recoil'

import { currentUserInfoQuery } from '@/store/userState'
import { Common } from '@/styles/common'

const HeaderProfile = () => {
  const { name, profile_image_url: profile, title } = useRecoilValue(currentUserInfoQuery)

  return (
    <div css={profileContainer}>
      <div css={imageWrap}>
        {profile ? <img src={profile} alt="profile" /> : <img src="/src/assets/default_profile.svg" alt="profile" />}
      </div>
      <div css={profileWrap}>
        <p css={userName}>{name}</p>
        <p css={userTitle}>{title}</p>
      </div>
    </div>
  )
}

export default HeaderProfile

const profileContainer = css`
  display: flex;
  gap: 10px;
  align-items: center;
`

const imageWrap = (theme: Theme) => css`
  overflow: hidden;

  width: 2rem;
  height: 2rem;

  border: 3px solid ${theme.background};
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
  }
`

const profileWrap = css`
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
  }
`

const userName = (theme: Theme) => css`
  font-size: ${Common.fontSize.fs10};
  color: ${theme.text};
`

const userTitle = (theme: Theme) => css`
  font-size: ${Common.fontSize.fs7};
  color: ${theme.text};
`
