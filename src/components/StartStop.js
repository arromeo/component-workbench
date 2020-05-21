import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { fromEvent, interval } from 'rxjs'
import { exhaustMap, map, takeUntil } from 'rxjs/operators'

export function StartStop() {
  const startButtonElem = useRef()
  const stopButtonElem = useRef()

  const [timerDisplay, setTimerDisplay] = useState(0)

  useEffect(() => {
    const startClicks = fromEvent(startButtonElem.current, 'click')
    const stopClicks = fromEvent(stopButtonElem.current, 'click')

    const timerObservable = startClicks
      .pipe(
        exhaustMap(() =>
          interval(1000).pipe(
            takeUntil(stopClicks),
            map(() => {
              setTimerDisplay((prev) => prev + 1)
            })
          )
        )
      )
      .subscribe()

    return () => timerObservable.unsubscribe()
  }, [])

  return (
    <Box padding={2}>
      <Typography variant="h2">{timerDisplay} seconds</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            ref={startButtonElem}
            variant="contained"
            fullWidth
            disableRipple
          >
            Start
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            ref={stopButtonElem}
            variant="contained"
            fullWidth
            disableRipple
          >
            Stop
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
