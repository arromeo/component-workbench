import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { fromEvent } from 'rxjs'
import { map, tap } from 'rxjs/operators'

// Components
import { IconButton } from '@material-ui/core'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'

const SliderContainer = styled.div`
  background-color: black;
  width: 800px;
  height: 450px;
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
  // position: absolute;
`

const COLORS = ['red', 'yellow', 'pink', 'green', 'purple', 'orange', 'blue']

export function StickySlider() {
  const nextButtonElem = useRef()
  const prevButtonElem = useRef()
  const currentSlide = useRef(COLORS.length - 1)

  useEffect(() => {
    const nextButtonClicks = fromEvent(nextButtonElem.current, 'click')

    const nextSlideObservable = nextButtonClicks
      .pipe(
        tap(() => {
          currentSlide.current && currentSlide.current--
        })
      )
      .subscribe()

    return () => nextSlideObservable.unsubscribe()
  }, [])

  return (
    <SliderContainer>
      {COLORS.map((color, index) => (
        <Slide key={index} index={index} color={color} />
      ))}
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
