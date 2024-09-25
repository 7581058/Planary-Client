import { Theme, useTheme } from '@emotion/react'
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { editBoardDetails, getThemeList } from '@/api'
import { THEME_GET_ERROR, THEME_UPDATE_ERROR, THEME_UPDATE_SUCCESS } from '@/constants/alert'
import { themeStyles } from '@/constants/theme'
import { useAlert } from '@/hooks/useAlert'
import { useBoardListFetch } from '@/hooks/useBoardListFetch'
import { boardListAtom, currentBoardIdAtom, themeDirtyFlag } from '@/store/boardState'
import { currentThemeAtom } from '@/store/themeState'
import { Common } from '@/styles/common'

interface ThemeListType {
  name: string
  id: number
  code: number
}
const BoardThemeMenu = () => {
  const [themeList, setThemeList] = useState<ThemeListType[]>([])
  const [originThemeCode, setOriginThemeCode] = useState(0) //기본값
  const { openAlert } = useAlert()
  const theme = useTheme()
  const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeAtom) //프로바이더에 전달되는 변경예정
  const boardListData = useRecoilValue(boardListAtom)
  const currentBoardId = useRecoilValue(currentBoardIdAtom)
  const { fetchBoardList } = useBoardListFetch()
  const setThemeDirty = useSetRecoilState(themeDirtyFlag)

  useEffect(() => {
    fetchBoardList()
  }, [])

  useEffect(() => {
    if (currentBoardId !== null && boardListData[currentBoardId]) {
      setOriginThemeCode(boardListData[currentBoardId].theme)
    }
  }, [currentBoardId, boardListData])

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const res = await getThemeList()
        if (res) {
          setThemeList(res.themeDatas.themeList)
        }
      } catch (error) {
        openAlert(THEME_GET_ERROR)
      }
    }
    fetchThemes()
  }, [])

  // 테마 목록에서 현재 적용된 테마인지 판별
  const isActiveTheme = (code: number) => {
    return currentTheme === code ? true : false
  }

  // 저장된 테마와 같은지 판별
  const isOriginTheme = (code: number) => {
    return originThemeCode === code ? true : false
  }

  //테마 코드에 따른 데이터 매핑, 코드에 해당하는 테마 리턴
  const getThemeData = (code: number) => {
    const themeData = themeStyles[code]
    return themeData
  }

  const handleClickTheme = (code: number) => {
    setCurrentTheme(code)

    if (!isOriginTheme(code)) {
      setThemeDirty(true)
    } else {
      setThemeDirty(false)
    }
  }

  const handleResetTheme = () => {
    setCurrentTheme(originThemeCode)
    setThemeDirty(false)
  }

  const handleChangeTheme = async () => {
    if (currentTheme === originThemeCode || currentBoardId === null) return
    try {
      const res = await editBoardDetails({ theme: currentTheme }, currentBoardId)
      if (res) {
        openAlert(THEME_UPDATE_SUCCESS)
        setThemeDirty(false)
        fetchBoardList()
      }
    } catch (error) {
      openAlert(THEME_UPDATE_ERROR)
    }
  }

  return (
    <div css={themeWrap}>
      <span>테마 설정</span>

      <div css={themeListContainer}>
        <div css={themeListWrap}>
          {themeList.length > 0 &&
            themeList &&
            themeList.map((item, index) => (
              <div key={index} onClick={() => handleClickTheme(item.code)} css={itemWrap}>
                <div css={listItem(theme, isActiveTheme(item.code), getThemeData(item.code).color)}>
                  {isOriginTheme(item.code) ? '적용중' : isActiveTheme(item.code) && '선택됨'}
                </div>
                <span>{item.name}</span>
              </div>
            ))}
        </div>
      </div>
      <div css={buttonWrap}>
        <button css={changeButton} onClick={handleResetTheme}>
          초기화
        </button>
        <button css={changeButton} onClick={handleChangeTheme}>
          변경
        </button>
      </div>
    </div>
  )
}

export default BoardThemeMenu

const themeWrap = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const themeListContainer = (theme: Theme) => css`
  overflow-y: scroll;
  display: flex;
  justify-content: center;

  width: 100%;
  height: 150px;
  padding: 10px;

  background-color: ${Common.colors.white};

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.scrollbarThumb};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${theme.scrollbarTrack};
    border: 2px solid ${theme.scrollbarTrackBorder};
  }
`

const themeListWrap = css`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
`

const itemWrap = css`
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;

  height: fit-content;

  span {
    font-size: ${Common.fontSize.fs7};
  }
`
const listItem = (theme: Theme, isActive: boolean, color: string) => css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  font-size: ${Common.fontSize.fs7};
  font-weight: 700;

  background-color: ${color};
  border: 2px solid ${isActive ? theme.darkBorder : theme.border};
`

const buttonWrap = css`
  display: flex;
  gap: 5px;
  justify-content: space-between;
  width: 100%;
`

const changeButton = (theme: Theme) => css`
  cursor: pointer;

  width: 100%;
  height: 30px;

  color: ${theme.borderButtonText};

  background-color: transparent;
  border: 1px solid ${theme.borderButtonborder};
  border-radius: 4px;
`
