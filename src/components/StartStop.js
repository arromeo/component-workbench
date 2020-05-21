import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import { fromEvent, interval } from 'rxjs'
import { exhaustMap, map, takeUntil } from 'rxjs/operators'

export function StartStop() {
  const startButtonElem = useRef()
  const stopButtonElem = useRef()

  const [timerDisplay, setTimerDisplay] = useState(0)

  useEffect(() => {
    const startClicks = fromEvent(startButtonElem.current, 'click')
    const stopClicks = fromEvent(stopButtonElem.current, 'click')

    const timerObservable = startClicks.pipe(
      exhaustMap(() =>
        interval(1000).pipe(
          takeUntil(stopClicks),
          map(() => {
            setTimerDisplay((prev) => prev + 1)
          })
        )
      )
    )

    const subscription = timerObservable.subscribe()
    return () => subscription.unsubscribe()
  }, [])

  return (
    <Box>
      <Typography>{timerDisplay}</Typography>
      <Button ref={startButtonElem}>Start</Button>
      <Button ref={stopButtonElem}>Stop</Button>
    </Box>
  )
}
