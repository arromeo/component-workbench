import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { concat, iif, interval, fromEvent } from 'rxjs'
import { finalize, switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators'

// Components
import { IconButton } from '@material-ui/core'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'

const SliderContainer = styled.div`
  background-color: black;
  width: 800px;
  height: 450px;
  position: relative;
  overflow: hidden;
`

const SlideContainer = styled.div`
  overflow: hidden;
`

const Slide = styled.div`
  position: absolute;
  background-color: ${({ color }) => color};
  width: 800px;
  height: 450px;
`

const ButtonOverlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  height: 450px;
`

const ButtonContainer = styled.div`
  z-index: 2000;
`

const COLORS = ['red', 'yellow', 'pink', 'green', 'purple', 'orange', 'blue']

const resetPosition = (elem) => {
  elem.style.zIndex = 100
  elem.style.left = '0px'
}

const SLIDE_THRESHOLD_RATIO = 0.2
const SNAP_BACK_PPMS = 2200 * (17 / 1000)

export function StickySlider() {
  const nextButtonElem = useRef()
  const prevButtonElem = useRef()
  const slideElems = useRef([])
  const currentSlideIndex = useRef(COLORS.length - 1)
  const currentSlide = useRef()

  const reorderNext = () =>
    slideElems.current.forEach((elem, index) => {
      const currentIndex = currentSlideIndex.current
      elem.style.zIndex =
        currentIndex + 1 === slideElems.current.length && index === 0
          ? 900
          : index === currentIndex
          ? 1000
          : index === currentIndex + 1
          ? 900
          : 100
    })

  const reorderPrev = () =>
    slideElems.current.forEach((elem, index) => {
      const currentIndex = currentSlideIndex.current
      elem.style.zIndex =
        currentIndex === 0 && index === slideElems.current.length - 1
          ? 900
          : index === currentIndex
          ? 1000
          : index === currentIndex - 1
          ? 900
          : 100
    })

  useEffect(() => {
    const nextButtonMouseDowns = fromEvent(nextButtonElem.current, 'mousedown')
    const prevButtonMouseDowns = fromEvent(prevButtonElem.current, 'mousedown')
    const mouseMoves = fromEvent(document, 'mousemove')
    const mouseUps = fromEvent(document, 'mouseup')

    currentSlide.current = slideElems.current[currentSlideIndex.current]

    const getCurrentLeft = () =>
      Number(currentSlide.current.style.left.slice(0, -2))
    const setCurrentLeft = (value) =>
      (currentSlide.current.style.left = value + 'px')
    const translateCurrent = (value) => setCurrentLeft(getCurrentLeft() + value)

    const nextSlideObservable = nextButtonMouseDowns
      .pipe(
        tap({ next: reorderNext }),
        switchMap((mouseDownEvent) =>
          concat(
            mouseMoves.pipe(
              tap({
                next: (mouseMoveEvent) =>
                  setCurrentLeft(
                    Math.min(mouseMoveEvent.pageX - mouseDownEvent.pageX, 0)
                  )
              }),
              takeUntil(mouseUps)
            ),
            iif(
              () => Math.abs(getCurrentLeft()) < 800 * SLIDE_THRESHOLD_RATIO,
              interval(17).pipe(
                tap({
                  next: () =>
                    translateCurrent(
                      Math.min(Math.abs(getCurrentLeft()), SNAP_BACK_PPMS)
                    )
                }),
                takeWhile(() => getCurrentLeft() < 0)
              ),
              interval(17).pipe(
                tap({
                  next: () =>
                    translateCurrent(
                      -Math.min(Math.abs(getCurrentLeft()), SNAP_BACK_PPMS)
                    )
                }),
                takeWhile(() => getCurrentLeft() > -800),
                finalize(() => {
                  const currentIndex = currentSlideIndex.current
                  const elemCount = slideElems.current.length
                  const oldCurrent = currentSlide.current

                  currentSlideIndex.current =
                    currentIndex === elemCount - 1 ? 0 : currentIndex + 1

                  currentSlide.current =
                    slideElems.current[currentSlideIndex.current]

                  resetPosition(oldCurrent)
                })
              )
            )
          )
        )
      )
      .subscribe()

    const prevSlideObservable = prevButtonMouseDowns
      .pipe(
        tap({ next: reorderPrev }),
        switchMap((mouseDownEvent) =>
          concat(
            mouseMoves.pipe(
              tap({
                next: (mouseMoveEvent) =>
                  setCurrentLeft(
                    Math.max(mouseDownEvent.pageX + mouseMoveEvent.pageX, 0)
                  )
              }),
              takeUntil(mouseUps)
            ),
            iif(
              () => getCurrentLeft() < 800 * SLIDE_THRESHOLD_RATIO,
              interval(17).pipe(
                tap({
                  next: () =>
                    translateCurrent(
                      -Math.min(getCurrentLeft(), SNAP_BACK_PPMS)
                    )
                }),
                takeWhile(() => getCurrentLeft() > 0)
              ),
              interval(17).pipe(
                tap({
                  next: () =>
                    translateCurrent(
                      Math.min(800 - getCurrentLeft(), SNAP_BACK_PPMS)
                    )
                }),
                takeWhile(() => getCurrentLeft() < 800),
                finalize(() => {
                  const currentIndex = currentSlideIndex.current
                  const elemCount = slideElems.current.length
                  const oldCurrent = currentSlide.current

                  currentSlideIndex.current =
                    currentIndex === 0 ? elemCount - 1 : currentIndex - 1

                  currentSlide.current =
                    slideElems.current[currentSlideIndex.current]
                  resetPosition(oldCurrent)
                })
              )
            )
          )
        )
      )
      .subscribe()

    return () => {
      nextSlideObservable.unsubscribe()
      prevSlideObservable.unsubscribe()
    }
  }, [])

  return (
    <SliderContainer>
      <SlideContainer>
        {COLORS.map((color, index) => (
          <Slide
            ref={(ref) => slideElems.current.push(ref)}
            key={index}
            index={index}
            color={color}
          />
        ))}
      </SlideContainer>
      <ButtonOverlay>
        <ButtonContainer>
          <IconButton ref={prevButtonElem}>
            <NavigateBefore />
          </IconButton>
        </ButtonContainer>
        <ButtonContainer>
          <IconButton ref={nextButtonElem}>
            <NavigateNext />
          </IconButton>
        </ButtonContainer>
      </ButtonOverlay>
    </SliderContainer>
  )
}
