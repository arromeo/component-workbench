import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import {
  checkIfCurrentMonth,
  checkIfPastMonth,
  getFirstDayOfMonth,
  getDaysInMonth
} from '../../modules/date-time'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

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
`

const DayGridItem = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  color: ${({ disabled }) => (disabled ? 'grey' : 'black')};
`

const MonthControlButton = styled.button``
const CalendarComponentContainer = styled.div``

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
  const currentDate = useRef(new Date())
  const [selectedMonth, setSelectedMonth] = useState(() =>
    currentDate.current.getMonth()
  )
  const [selectedYear, setSelectedYear] = useState(() =>
    currentDate.current.getFullYear()
  )

  const handleMonthChange = (change) => {}

  const handleMonthIncrease = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0)
      setSelectedYear((prev) => prev + 1)
    } else {
      setSelectedMonth((prev) => prev + 1)
    }
  }

  const handleMonthDecrease = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11)
      setSelectedYear((prev) => prev - 1)
    } else {
      setSelectedMonth((prev) => prev - 1)
    }
  }

  return (
    <CalendarComponentContainer>
      <MonthControlButton onClick={handleMonthDecrease}>Previous</MonthControlButton>
      <MonthControlButton onClick={handleMonthIncrease}>Next</MonthControlButton>
      <CalendarContainer>
        <MonthContainer>
          <Month>
            <h1>{MONTHS[selectedMonth % 12]}</h1>
            <DayGrid>{generateDays(selectedMonth % 12, selectedYear)}</DayGrid>
          </Month>
          <Month>
            <h1>{MONTHS[(selectedMonth + 1) % 12]}</h1>
            <DayGrid>
              {generateDays(
                (selectedMonth + 1) % 12,
                selectedYear + Math.floor((selectedMonth + 1) / 12)
              )}
            </DayGrid>
          </Month>
        </MonthContainer>
      </CalendarContainer>
    </CalendarComponentContainer>
  )
}
