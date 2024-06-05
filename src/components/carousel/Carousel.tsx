import { Theme } from '@emotion/react'
import { css, useTheme } from '@emotion/react'
import React, { useEffect, useRef, useState } from 'react'
import { GrPrevious } from 'react-icons/gr'
import { GrNext } from 'react-icons/gr'
interface CarouselProps {
  items: React.ReactElement[]
  auto?: boolean
}

const Carousel = ({ items, auto }: CarouselProps) => {
  const theme = useTheme()
  const [currentSlide, setCurrentSlide] = useState(1)
  const [transition, setTransition] = useState(0.5)
  const [slides, setSlides] = useState<React.ReactElement[]>([])

  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (items.length > 0) {
      const slideStart = items[0]
      const slideEnd = items[items.length - 1]
      const slideNew = [slideEnd, ...items, slideStart]
      setSlides(slideNew)
    }
  }, [items])

  useEffect(() => {
    if (auto && items.length > 1) {
      timeoutRef.current = window.setTimeout(() => {
        nextSlide()
      }, 3000)
      return () => {
        if (timeoutRef.current !== null) {
          clearTimeout(timeoutRef.current)
        }
      }
    }
  }, [currentSlide, auto])

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
          <button css={[moveButton, prevButton]} onClick={prevSlide}>
            <GrPrevious />
          </button>
          <button css={[moveButton, nextButton]} onClick={nextSlide}>
            <GrNext />
          </button>
        </>
      )}
      <div css={paginationWrap}>
        {items.length > 0 &&
          items.map((_, index) => (
            <div
              css={paginationDot(theme, index + 1 === currentSlide)}
              key={index}
              onClick={() => moveSlide(index + 1)}
            />
          ))}
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

  width: 100%;
  height: 100%;
`

const paginationWrap = css`
  display: flex;
  flex-shrink: 0;
  gap: 8px;
  align-items: center;
  justify-content: center;

  width: 100%;
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
`

const nextButton = css`
  right: 0;
`

const paginationDot = (theme: Theme, active: boolean) => css`
  cursor: pointer;

  width: 8px;
  height: 8px;

  background-color: ${active ? theme.previewText : theme.previewSubText};
  border-radius: 50%;
`
