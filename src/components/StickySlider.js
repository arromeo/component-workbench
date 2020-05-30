import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { fromEvent } from 'rxjs'
import { switchMap, takeUntil, tap } from 'rxjs/operators'

// Components
import { IconButton } from '@material-ui/core'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'

const SliderContainer = styled.div`
  background-color: black;
  width: 800px;
  height: 450px;
  position: relative;If I re
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

export function StickySlider() {
  const nextButtonElem = useRef()
  const prevButtonElem = useRef()
  const slideElems = useRef([])
  const currentSlide = useRef(COLORS.length - 1)

  const reorderNext = () =>
    slideElems.current.forEach((elem, index) => {
      elem.style.zIndex =
        index === currentSlide.current
          ? 1000
          : index === currentSlide.current + 1 &&
            currentSlide.current + 1 < slideElems.currentlength
          ? 900
          : 100
      elem.style.visibility =
        currentSlide.current + 1 === slideElems.current.length
          ? index === currentSlide.current
            ? 'visible'
            : 'hidden'
          : index === currentSlide.current || index === currentSlide.current + 1
          ? 'visible'
          : 'hidden'
    })

  const reorderPrev = () =>
    slideElems.current.forEach((elem, index) => {
      elem.style.zIndex =
        index === currentSlide.current
          ? 1000
          : index === currentSlide.current - 1 && currentSlide.current > 0
          ? 900
          : 100
      elem.style.visibility =
        currentSlide.current === 0
          ? index === currentSlide.current
            ? 'visible'
            : 'hidden'
          : index === currentSlide.current || index === currentSlide.current - 1
          ? 'visible'
          : 'hidden'
    })

  useEffect(() => {
    const nextButtonMouseDowns = fromEvent(nextButtonElem.current, 'mousedown')
    const prevButtonMouseDowns = fromEvent(prevButtonElem.current, 'mousedown')
    const mouseMoves = fromEvent(document, 'mousemove')
    const mouseUps = fromEvent(document, 'mouseup')

    const nextSlideObservable = nextButtonMouseDowns
      .pipe(
        tap(reorderNext),
        switchMap((mouseDownEvent) =>
          mouseMoves.pipe(
            tap((mouseMoveEvent) => {
              const xDelta = mouseMoveEvent.pageX - mouseDownEvent.pageX
              if (xDelta < 0)
                slideElems.current[currentSlide.current].style.left =
                  xDelta + 'px'
            }),
            takeUntil(mouseUps)
          )
        )
      )
      .subscribe()

    const prevSlideObservable = prevButtonMouseDowns
      .pipe(
        tap(reorderPrev),
        switchMap((mouseDownEvent) =>
          mouseMoves.pipe(
            tap((mouseMoveEvent) => {
              const xDelta = mouseDownEvent.pageX + mouseMoveEvent.pageX
              if (xDelta > 0)
                slideElems.current[currentSlide.current].style.left =
                  xDelta + 'px'
            }),
            takeUntil(mouseUps)
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
