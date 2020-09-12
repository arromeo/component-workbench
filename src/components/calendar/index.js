import React from 'react'
import styled from 'styled-components'
import {
  checkIfCurrentMonth,
  checkIfPastMonth,
  getFirstDayOfMonth,
  getDaysInMonth
} from '../../modules/date-time'

const CalendarContainer = styled.div`
  width: 600px;
  height: 250px;
  padding: 20px;
  background-color: tan;
`

const MonthContainer = styled.div`
  display: flex;
  height: 100%;
`

const Month = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;

  & > h1 {
    font-size: 20px;
  }
`

const DayGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  height: 80%;
  border: solid black 1px;
`

const DayGridItem = styled.div`
  color: ${({disabled}) => disabled ? 'grey' : 'black'};
`

const generateDays = (month, year) => {
  const firstDayOfMonth = getFirstDayOfMonth(month, year)
  const daysInMonth = getDaysInMonth(month, year)

  const currentDate = new Date().getDate()
  const isPastMonth = checkIfPastMonth(month, year)
  const isCurrentMonth = isPastMonth ? false : checkIfCurrentMonth(month, year)

  return Array.from(new Array(42)).map((_, index) => {
    const pastMonth = index < firstDayOfMonth
    const nextMonth = index > daysInMonth + firstDayOfMonth - 1

    const shouldBeDisabled =
      isPastMonth ||
      (isCurrentMonth && index - firstDayOfMonth + 1 < currentDate)

    return pastMonth || nextMonth ? (
      <DayGridItem key={index} />
    ) : (
      <DayGridItem disabled={shouldBeDisabled} key={index}>
        {index - firstDayOfMonth + 1}
      </DayGridItem>
    )
  })
}

export function Calendar() {
  return (
    <CalendarContainer>
      <MonthContainer>
        <Month>
          <h1>Jan</h1>
          <DayGrid>{generateDays(8, 2020)}</DayGrid>
        </Month>
        <Month>
          <h1>Jan</h1>
          <DayGrid></DayGrid>
        </Month>
      </MonthContainer>
    </CalendarContainer>
  )
}
