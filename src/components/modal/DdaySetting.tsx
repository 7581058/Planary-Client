import { css } from '@emotion/react'
import { Theme } from '@emotion/react'
import { useState } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import { RxDragHandleHorizontal } from 'react-icons/rx'
import { useRecoilValue } from 'recoil'
import SquareToggle from '../toggle/SquareToggle'

import { useModal } from '@/hooks/useModal'
import { currentDdayQuery } from '@/store/ddayState'
import { Common, noDrag } from '@/styles/common'
import { calculateDday } from '@/utils/calculateDday'
import { convertDate } from '@/utils/convertDate'
import { rgba } from '@/utils/convertRGBA'

interface DdayItem {
  icon: string
  index: number
  title: string
  date: string
}

const GridLayout = WidthProvider(RGL)

const DdaySetting = () => {
  const { closeModal } = useModal()
  const ddayList = useRecoilValue(currentDdayQuery)
  const [auto, setAuto] = useState(ddayList.isAuto)
  const [isEdit, setisEdit] = useState(false)
  const [icon, setIcon] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  const handleClickClose = () => {
    closeModal()
  }

  const handleClickToggle = () => {
    setAuto(!auto)
  }

  const convertLayouts = (data: DdayItem[]) => {
    const layouts = data.map((item) => ({
      i: String(item.index),
      x: 1,
      y: item.index,
      w: 1,
      h: 1,
    }))
    return layouts
  }

  const handleClickAdd = () => {
    alert(icon + description + date)
  }

  const handleClickEdit = () => {
    setisEdit(true)
  }
  const handleClickDelete = () => { }

  const handleClickEditCancel = () => {
    setisEdit(false)
  }

  const handleClickEditConfirm = () => { }

  //todo: 디데이 수정, 삭제, 추가 구현하기
  return (
    <div css={container}>
      <span css={title}>디데이 설정</span>
      <div css={wrap}>
        <div css={leftWrap}>
          <div css={toggleWrap}>
            <span css={subTitle}>디데이 자동 재생</span>
            <SquareToggle auto={auto} handleClickToggle={handleClickToggle} />
          </div>
          <span css={subTitle}>디데이 목록</span>
          <div css={[listWrap, noDrag]}>
            <GridLayout
              layout={convertLayouts(ddayList.data)}
              isResizable={false}
              rowHeight={40}
              useCSSTransforms={false}
              draggableHandle=".drag-handle"
              cols={1}
              isBounded={true}
              containerPadding={[0, 0]}
              margin={[2, 2]}
            >
              {ddayList &&
                ddayList.data.map((item: DdayItem, index: number) => (
                  <div css={listItem} key={index}>
                    <div css={dragHandle} className="drag-handle">
                      <RxDragHandleHorizontal />
                    </div>
                    <span css={itemIcon}>{item.icon}</span>
                    <span>{item.title}</span>
                    <span>{convertDate(item.date, 'dot')}</span>
                    <span>{calculateDday(item.date)}</span>
                    <div css={itemButtonWrap}>
                      <button css={itemButton} onClick={handleClickEdit}>
                        [수정]
                      </button>
                      <button css={itemButton} onClick={handleClickDelete}>
                        [삭제]
                      </button>
                    </div>
                  </div>
                ))}
            </GridLayout>
          </div>
        </div>
        <div css={rightWrap}>
          <span css={subTitle}>{isEdit ? '디데이 편집' : '디데이 추가'}</span>
          <div css={formWrap}>
            <div css={inputWrap}>
              <label htmlFor="">아이콘</label>
              <select onChange={(e) => setIcon(e.target.value)} css={iconSelect} name="" id="">
                <option value="">선택안함</option>
              </select>
            </div>
            <div css={inputWrap}>
              <label htmlFor="">제목</label>
              <input onChange={(e) => setDescription(e.target.value)} type="text" />
            </div>
            <div css={inputWrap}>
              <label htmlFor="">날짜</label>
              <input onChange={(e) => setDate(e.target.value)} type="date" name="" id="" />
            </div>
          </div>
          <div css={rightButtonWrap}>
            {isEdit ? (
              <>
                <button css={[rightButton, editCancelButton]} onClick={handleClickEditCancel}>
                  취소
                </button>
                <button css={[rightButton, editConfirmButton]} onClick={handleClickEditConfirm}>
                  수정
                </button>
              </>
            ) : (
              <button css={ddayAddButton} onClick={handleClickAdd}>
                추가
              </button>
            )}
          </div>
        </div>
      </div>
      <button css={modalCloseButton} onClick={handleClickClose}>
        닫기
      </button>
    </div>
  )
}

export default DdaySetting

const container = css`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;

  width: 740px;
`

const wrap = css`
  display: flex;
  gap: 20px;
  width: 100%;
  height: 100%;
`

const leftWrap = css`
  display: flex;
  flex-basis: 0;
  flex-direction: column;
  flex-grow: 1.5;
  gap: 10px;

  width: 100%;
  height: 100%;
  padding-top: 15px;
`

const rightWrap = (theme: Theme) => css`
  display: flex;
  flex-basis: 0;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;

  width: 100%;
  height: 100%;
  padding: 15px;

  background-color: ${theme.subBackground};
  border-radius: 4px;
`

const title = css`
  width: 100%;
  font-size: ${Common.fontSize.fs12};
  font-weight: 700;
  text-align: left;
`

const subTitle = (theme: Theme) => css`
  width: 100%;
  font-size: ${Common.fontSize.fs8};
  color: ${theme.previewText};
`

const listWrap = (theme: Theme) => css`
  overflow-y: auto;

  box-sizing: border-box;
  width: 100%;
  height: 300px;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.scrollbarThumb};
  }

  &::-webkit-scrollbar-track {
    background-color: ${theme.scrollbarTrack};
    border: 2px solid ${theme.scrollbarTrackBorder};
  }

  .react-grid-placeholder {
    opacity: 1;
    background-color: ${rgba(theme.dragDropOverBackground, 0.3)};
  }
`

const listItem = (theme: Theme) => css`
  display: flex;
  gap: 5px;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 5px;

  background-color: ${theme.panel};
  border: 2px solid ${theme.border};
`

const itemIcon = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;
  margin-right: -5px;
`

const dragHandle = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

const formWrap = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  input {
    width: 100%;
    height: 40px;

    color: ${theme.modalSubText};

    border: 3px solid ${theme.border};
    border-radius: 4px;
  }

  input[type='text'] {
    border: 3px solid ${theme.border};
  }
`

const inputWrap = css`
  display: flex;
  align-items: center;
  width: 100%;

  label {
    flex-shrink: 0;
    width: 50px;
    margin-right: 5px;
    font-size: ${Common.fontSize.fs8};
  }
`

const toggleWrap = css`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
`

const modalCloseButton = (theme: Theme) => css`
  cursor: pointer;

  position: absolute;
  bottom: 0;

  width: 50px;
  height: 30px;

  font-size: ${Common.fontSize.fs9};
  color: ${theme.buttonText};

  background-color: ${theme.subButton};
  border-radius: 8px;
`

const ddayAddButton = (theme: Theme) => css`
  cursor: pointer;

  width: 100%;
  height: 40px;
  margin-top: 10px;

  font-size: ${Common.fontSize.fs9};
  color: ${theme.buttonText};

  background-color: ${theme.button};
  border-radius: 8px;
`

const iconSelect = (theme: Theme) => css`
  height: 40px;

  color: ${theme.subSelectText};

  background-color: ${theme.subSelectBackground};
  border: 2px solid ${theme.border};
  border-radius: 4px;

  &:active,
  &:focus {
    outline: none;
  }

  option {
    background-color: ${theme.selectOptionBackground};
  }
`

const itemButtonWrap = css`
  position: absolute;
  right: 5px;
  display: flex;
  gap: 5px;
`

const itemButton = (theme: Theme) => css`
  cursor: pointer;
  padding: 0;
  color: ${theme.previewText};
  background-color: transparent;
`

const rightButtonWrap = css`
  display: flex;
  gap: 10px;
`

const rightButton = css`
  cursor: pointer;

  width: 100%;
  height: 40px;
  margin-top: 10px;

  font-size: ${Common.fontSize.fs9};

  border-radius: 8px;
`

const editCancelButton = (theme: Theme) => css`
  color: ${theme.subButtonText};
  background-color: transparent;
  background-color: ${theme.border};
`

const editConfirmButton = (theme: Theme) => css`
  color: ${theme.buttonText};
  background-color: ${theme.button};
`
