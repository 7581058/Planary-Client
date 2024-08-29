import { css } from '@emotion/react'
import { Theme } from '@emotion/react'
import { useEffect, useState } from 'react'
import RGL, { Layout, WidthProvider } from 'react-grid-layout'
import { RxDragHandleHorizontal } from 'react-icons/rx'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'
import SquareToggle from '../toggle/SquareToggle'

import { addDday, deleteDday, updateDday, updateDdayCarouselSettings, updateDdayOrder } from '@/api'
import {
  COMMON_FAILED_ALERT,
  DDAY_ADD_FAILED_ALERT,
  DDAY_DELETE_FAILED_ALERT,
  DDAY_UPDATE_CAROUSEL_FAILED_ALERT,
  DDAY_UPDATE_CAROUSEL_SUCCESS_ALERT,
  DDAY_UPDATE_FAILED_ALERT,
  DDAY_UPDATE_ORDER_FAILED_ALERT,
  DDAY_UPDATE_ORDER_SUCCESS_ALERT,
} from '@/constants/alert'
import { DDAY_ICONS } from '@/constants/icons'
import { useAlert } from '@/hooks/useAlert'
import { useModal } from '@/hooks/useModal'
import { currentDdayQuery, currentDdayWidgetId } from '@/store/ddayState'
import { currentModalState } from '@/store/modalState'
import { Common, noDrag } from '@/styles/common'
import { calculateDday } from '@/utils/calculateDday'
import { convertDate } from '@/utils/convertDate'
import { rgba } from '@/utils/convertRGBA'
interface DdayItem {
  icon: number
  id: number
  title: string
  date: string
  order: number
}

const GridLayout = WidthProvider(RGL)

const DdaySetting = () => {
  const { closeModal } = useModal()
  const modalState = useRecoilValue(currentModalState)
  const ddayWidgetId = useRecoilValue(currentDdayWidgetId)
  const ddayData = useRecoilValue(currentDdayQuery)
  const refreshDdayQuery = useRecoilRefresher_UNSTABLE(currentDdayQuery)

  const [auto, setAuto] = useState(false)
  const [editDdayId, setEditDdayId] = useState<number | null>(null)
  const [isEdit, setisEdit] = useState(false)
  const [icon, setIcon] = useState<string | number>('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const { openAlert } = useAlert()

  useEffect(() => {
    if (ddayData.ddayList) {
      setAuto(ddayData.isAuto ? true : false)
    }
  }, [ddayData])

  const handleClickClose = () => {
    closeModal()
  }

  const handleClickToggle = async () => {
    try {
      const res = await updateDdayCarouselSettings(ddayWidgetId, { isAuto: auto ? 1 : 0 })

      if (res) {
        openAlert(DDAY_UPDATE_CAROUSEL_SUCCESS_ALERT)
        refreshDdayQuery()
      }
    } catch (error) {
      openAlert(DDAY_UPDATE_CAROUSEL_FAILED_ALERT)
      setAuto(false)
    }
  }

  const handleClickAdd = async () => {
    if (!modalState.widgetId) {
      openAlert(COMMON_FAILED_ALERT)
      return
    }

    const body = {
      widgetId: modalState.widgetId,
      icon: Number(icon),
      title: description,
      date,
    }
    try {
      const res = await addDday(body)
      if (res) {
        refreshDdayQuery()
        setIcon('')
        setDescription('')
        setDate('')
      }
    } catch (error) {
      openAlert(DDAY_ADD_FAILED_ALERT)
    }
  }

  const handleClickEdit = (icon: number, title: string, date: string, ddayId: number) => {
    setisEdit(true)
    setEditDdayId(ddayId)
    setIcon(icon)
    setDescription(title)
    setDate(date)
  }

  const handleClickDelete = async (ddayId: number) => {
    try {
      const res = await deleteDday(ddayId)
      if (res) {
        refreshDdayQuery()
      }
    } catch (error) {
      openAlert(DDAY_DELETE_FAILED_ALERT)
    }
  }

  const handleClickEditCancel = () => {
    setisEdit(false)
    setIcon('')
    setDescription('')
    setDate('')
  }

  const handleClickEditConfirm = async () => {
    try {
      const body = {
        icon: Number(icon),
        title: description,
        date: date,
      }
      const res = await updateDday(editDdayId, body)
      if (res) {
        refreshDdayQuery()
        setIcon('')
        setDescription('')
        setDate('')
        setisEdit(false)
      }
    } catch (error) {
      openAlert(DDAY_UPDATE_FAILED_ALERT)
    }
  }

  const convertLayouts = (data: DdayItem[]) => {
    if (data && data.length > 0) {
      const result = data.map((item) => ({
        i: String(item.id),
        x: 0,
        y: Number(item.order),
        w: 1,
        h: 1,
      }))
      return result
    }
    return []
  }

  const onListOrderChange = async (layout: Layout[]) => {

    const prevLayout = convertLayouts(ddayData.ddayList)
    const isLayoutChanged = layout.some((item, index) => item.y !== prevLayout[index].y)

    if (isLayoutChanged) {
      const updatedOrders = layout
        .sort((a, b) => a.y - b.y)
        .map((item, index) => ({
          id: Number(item.i),
          order: index,
        }))

      if (updatedOrders.length > 0) {
        try {
          const res = await updateDdayOrder(updatedOrders)
          if (res) {
            openAlert(DDAY_UPDATE_ORDER_SUCCESS_ALERT)
            refreshDdayQuery()
          }
        } catch (error) {
          openAlert(DDAY_UPDATE_ORDER_FAILED_ALERT)
        }
      }
    }
  }

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
            {ddayData.ddayList && ddayData.ddayList.length > 0 ? (
              <GridLayout
                layout={convertLayouts(ddayData.ddayList)}
                isResizable={false}
                rowHeight={40}
                useCSSTransforms={false}
                draggableHandle=".drag-handle"
                cols={1}
                isBounded={true}
                containerPadding={[0, 0]}
                margin={[2, 2]}
                onDragStop={onListOrderChange}
              >
                {ddayData.ddayList.map((item: DdayItem) => (
                  <div css={listItem} key={item.id}>
                    <div css={dragHandle} className="drag-handle">
                      <RxDragHandleHorizontal />
                    </div>
                    <span css={itemIcon}>{DDAY_ICONS[item.icon]}</span>
                    <span css={itemTitle}>{item.title}</span>
                    <span css={itemDate}>{convertDate(item.date, 'dot')}</span>
                    <span>{calculateDday(item.date)}</span>
                    <div css={itemButtonWrap}>
                      <button
                        css={itemButton}
                        onClick={() => handleClickEdit(item.icon, item.title, item.date, item.id)}
                      >
                        [수정]
                      </button>
                      <button css={itemButton} onClick={() => handleClickDelete(item.id)}>
                        [삭제]
                      </button>
                    </div>
                  </div>
                ))}
              </GridLayout>
            ) : (
              <div css={emptyContainer}>등록된 디데이가 없습니다.</div>
            )}
          </div>
        </div>
        <div css={rightWrap}>
          <span css={subTitle}>{isEdit ? '디데이 편집' : '디데이 추가'}</span>
          <div css={formWrap}>
            <div css={inputWrap}>
              <label htmlFor="ddayIcon">아이콘</label>
              <select onChange={(e) => setIcon(e.target.value)} css={iconSelect} id="ddayIcon" value={icon}>
                <option value="0">선택안함</option>
                <option value="1">✏️</option>
                <option value="2">❤️</option>
                <option value="3">💯</option>
                <option value="4">🌟</option>
                <option value="5">✈️</option>
                <option value="6">💻</option>
              </select>
            </div>
            <div css={inputWrap}>
              <label htmlFor="ddayTitle">제목</label>
              <input id="ddayTitle" onChange={(e) => setDescription(e.target.value)} type="text" value={description} />
            </div>
            <div css={inputWrap}>
              <label htmlFor="ddayDate">날짜</label>
              <input id="ddayDate" onChange={(e) => setDate(e.target.value)} type="date" value={date} />
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

  width: 780px;
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
`

const itemTitle = css`
  overflow: hidden;
  width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const itemDate = css`
  width: 110px;
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

const emptyContainer = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  color: ${theme.subText};

  border: 2px solid ${theme.border};
`
