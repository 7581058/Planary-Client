import { Theme } from '@emotion/react'
import { css, useTheme } from '@emotion/react'
import React, { useEffect, useRef, useState } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { GiPauseButton } from 'react-icons/gi'
import { GrPrevious } from 'react-icons/gr'
import { GrNext } from 'react-icons/gr'

import { Common } from '@/styles/common'
interface CarouselProps {
  items: React.ReactElement[]
  auto?: boolean | null
  control?: boolean
}

const Carousel = ({ items, auto, control }: CarouselProps) => {
  const theme = useTheme()
  const [currentSlide, setCurrentSlide] = useState(1)
  const [transition, setTransition] = useState(0.5)
  const [slides, setSlides] = useState<React.ReactElement[]>([])
  const [isAuto, setIsAuto] = useState<null | boolean | undefined>(null)
  const [paginationWidth, setPaginationWidth] = useState(0)

  const timeoutRef = useRef<number | null>(null)
  const paginationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (items.length > 0) {
      const slideStart = items[0]
      const slideEnd = items[items.length - 1]
      const slideNew = [slideEnd, ...items, slideStart]
      setSlides(slideNew)
    }
  }, [items])

  useEffect(() => {
    if (auto !== null) {
      setIsAuto(auto)
    }
  }, [setIsAuto, auto])

  useEffect(() => {
    if (isAuto && items.length > 1) {
      timeoutRef.current = window.setTimeout(() => {
        nextSlide()
      }, 3000)
      return () => {
        if (timeoutRef.current !== null) {
          clearTimeout(timeoutRef.current)
        }
      }
    }
  }, [currentSlide, isAuto, items.length])

  useEffect(() => {
    if (paginationRef.current) {
      setPaginationWidth(paginationRef.current.offsetWidth)
    }
  }, [items])

  const nextSlide = () => {
    setCurrentSlide((prev) => prev + 1)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => prev - 1)
  }

  const moveSlide = (index: number) => {
    setTransition(0)
    setCurrentSlide(index)
    setTimeout(() => {
      setTransition(0.5)
    }, 50)
  }

  const handleTransitionEnd = () => {
    if (currentSlide === slides.length - 1) {
      moveSlide(1)
    } else if (currentSlide === 0) {
      moveSlide(slides.length - 2)
    }
  }

  const handleClickControl = () => {
    setIsAuto(!isAuto)
  }

  return (
    <div css={container}>
      <div css={carouselWrap(currentSlide, transition)} onTransitionEnd={handleTransitionEnd}>
        {slides &&
          slides.map((Component, index) => (
            <div css={slide} key={index}>
              {Component}
            </div>
          ))}
      </div>
      {items.length > 1 && (
        <>
          <button className="prev-button" css={[moveButton, prevButton]} onClick={prevSlide}>
            <GrPrevious />
          </button>
          <button className="next-button" css={[moveButton, nextButton]} onClick={nextSlide}>
            <GrNext />
          </button>
        </>
      )}
      <div css={paginationWrap} ref={paginationRef}>
        {items.length > 0 && (
          <>
            {items.map((_, index) => (
              <div
                css={paginationDot(theme, index + 1 === currentSlide)}
                key={index}
                onClick={() => moveSlide(index + 1)}
              />
            ))}
            {control && items.length > 1 && (
              <div css={controlButton(theme, paginationWidth)} onClick={handleClickControl}>
                {isAuto ? (
                  <div css={pauseButton}>
                    <GiPauseButton />
                  </div>
                ) : (
                  <div css={playButton}>
                    <BsFillPlayFill />
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Carousel

const container = css`
  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  &:hover {
    .prev-button {
      opacity: 1;
    }

    .next-button {
      opacity: 1;
    }
  }
`

const paginationWrap = css`
  position: relative;

  display: flex;
  flex-shrink: 0;
  gap: 8px;
  align-items: center;
  justify-content: center;

  width: fit-content;
  height: 10px;
`

const carouselWrap = (currentSlide: number, transition: number) => css`
  transform: translateX(-${currentSlide * 100}%);

  display: flex;

  width: 100%;
  height: 100%;

  transition: transform ${transition}s ease-in-out;
`

const slide = css`
  min-width: 100%;
  min-height: 100%;
`

const moveButton = (theme: Theme) => css`
  cursor: pointer;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  color: ${theme.previewText};

  background: none;
  border: none;
`

const prevButton = css`
  left: 0;
  opacity: 0;
`

const nextButton = css`
  right: 0;
  opacity: 0;
`

const paginationDot = (theme: Theme, active: boolean) => css`
  cursor: pointer;

  width: 8px;
  height: 8px;

  background-color: ${active ? theme.previewText : theme.previewSubText};
  border-radius: 50%;
`

const controlButton = (theme: Theme, paginationWidth: number) => css`
  cursor: pointer;

  position: absolute;
  left: calc(50% + ${paginationWidth / 2}px + 8px);

  display: flex;
  align-items: center;
  justify-content: center;

  width: 8px;
  height: 8px;

  color: ${theme.previewSubText};
`

const pauseButton = css`
  margin-top: 3px;
  font-size: ${Common.fontSize.fs6};
`

const playButton = css`
  margin-top: 3px;
  font-size: ${Common.fontSize.fs8};
`
