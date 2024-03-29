import { css } from '@emotion/react'
import { Theme } from '@emotion/react'
import { useEffect, useState } from 'react'

import { getMyPage } from '@/api'
import { Common } from '@/styles/common'

const HeaderProfile = () => {
  const [name, setName] = useState('')
  const [profile, setProfile] = useState('')
  const [title, setTitle] = useState('')

  const getProfile = async () => {
    try {
      const res = await getMyPage()
      if (res) {
        setName(res.name)
        setProfile(res.profile_image_url)
        setTitle(res.title)
      } else {
        alert('유저정보불러오기실패')
      }
    } catch (error) {
      alert(`유저정보불러오기실패${error}`)
    }
  }

  useEffect(() => {
    getProfile()
  })

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
  align-items: center;
  gap: 10px;
`

const imageWrap = (theme: Theme) => css`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${theme.background};
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
  color: ${theme.buttonText};
`

const userTitle = (theme: Theme) => css`
  font-size: ${Common.fontSize.fs7};
  color: ${theme.buttonText};
  color: ${Common.colors.point};
`
