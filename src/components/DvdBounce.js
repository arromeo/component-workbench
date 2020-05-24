import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { interval } from 'rxjs'
import { map } from 'rxjs/operators'
import { ReactComponent as DvdLogo } from '../assets/dvd_logo.svg'

function nextColor(currentColor) {
  const colors = ['red', 'green', 'blue', 'orange', 'purple', 'yellow']
  if (!currentColor) return colors[0]
  console.log(currentColor)

  const index = colors.indexOf(currentColor) + 1
  return colors[index % 6]
}

const Surface = styled.div`
  background-color: black;
  height: 450px;
  width: 800px;
`

const AnimatedObject = styled.div`
  position: relative;
  background-color: yellow;
  height: 95px;
  width: 95px;
`

export function DvdBounce() {
  const surfaceElem = useRef()
  const animatedObjectElem = useRef()

  useEffect(() => {
    let xDelta = 2
    let yDelta = 2

    const animationSubscription = interval(16)
      .pipe(map(() => {}))
      .subscribe(() => {
        const newX =
          Number(animatedObjectElem.current.style.left.slice(0, -2)) + xDelta
        const newY =
          Number(animatedObjectElem.current.style.top.slice(0, -2)) + yDelta

        if (
          newX >=
            surfaceElem.current.clientWidth -
              animatedObjectElem.current.clientWidth ||
          newX <= 0
        ) {
          xDelta = -xDelta
          animatedObjectElem.current.style.backgroundColor = nextColor(
            animatedObjectElem.current.style.backgroundColor
          )
        }
        if (
          newY >=
            surfaceElem.current.clientHeight -
              animatedObjectElem.current.clientHeight ||
          newY <= 0
        ) {
          yDelta = -yDelta
          animatedObjectElem.current.style.backgroundColor = nextColor(
            animatedObjectElem.current.style.backgroundColor
          )
        }

        animatedObjectElem.current.style.left = newX + 'px'
        animatedObjectElem.current.style.top = newY + 'px'
      })

    return () => animationSubscription.unsubscribe()
  }, [])

  return (
    <Surface ref={surfaceElem}>
      <AnimatedObject ref={animatedObjectElem}>
        <DvdLogo />
      </AnimatedObject>
    </Surface>
  )
}
