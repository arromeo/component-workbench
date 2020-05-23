import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { fromEvent } from 'rxjs'
import { concatMap, map, takeUntil } from 'rxjs/operators'

const Surface = styled.div`
  background-color: pink;
  height: 20rem;
`

const DraggableItem = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: tan;
  height: 3rem;
  width: 6rem;
`

export function DragNDrop() {
  const surfaceElem = useRef()
  const draggableElem = useRef()

  useEffect(() => {
    const mouseDowns = fromEvent(draggableElem.current, 'mousedown')
    const mouseMoves = fromEvent(surfaceElem.current, 'mousemove')
    const documentMouseUps = fromEvent(document, 'mouseup')

    const dragObservable = mouseDowns
      .pipe(
        concatMap((mouseDownEvent) =>
          mouseMoves.pipe(
            takeUntil(documentMouseUps),
            map((mouseMoveEvent) => ({
              xPos: mouseMoveEvent.clientX - mouseDownEvent.offsetX,
              yPos: mouseMoveEvent.clientY - mouseDownEvent.offsetY
            }))
          )
        )
      )
      .subscribe((result) => {
        draggableElem.current.style.left = result.xPos + 'px'
        draggableElem.current.style.top = result.yPos + 'px'
      })

    return () => dragObservable.unsubscribe()
  }, [])

  return (
    <Surface ref={surfaceElem}>
      <DraggableItem ref={draggableElem}>Drag Me!</DraggableItem>
    </Surface>
  )
}
