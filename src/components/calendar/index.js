import React, { useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

// Components
import Month from './Month';

const CalendarContainer = styled.div`
  background-color: tan;
  width: 600px;
`;

const MonthContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const MonthControlButton = styled.button``;
const CalendarComponentContainer = styled.div``;

export function Calendar() {
  const currentDate = useRef(new Date());
  const [selectedMonth, setSelectedMonth] = useState(() =>
    currentDate.current.getMonth()
  );
  const [selectedYear, setSelectedYear] = useState(() =>
    currentDate.current.getFullYear()
  );

  const handleMonthIncrease = useCallback(() => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  }, [selectedMonth]);

  const handleMonthDecrease = useCallback(() => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  }, [selectedMonth]);

  const disablePreviousMonthButton = useMemo(
    () =>
      selectedMonth === currentDate.current.getMonth() &&
      selectedYear === currentDate.current.getFullYear(),
    [selectedMonth, selectedYear]
  );

  return (
    <CalendarComponentContainer>
      <MonthControlButton
        onClick={handleMonthDecrease}
        disabled={disablePreviousMonthButton}
      >
        Previous
      </MonthControlButton>
      <MonthControlButton onClick={handleMonthIncrease}>
        Next
      </MonthControlButton>
      <CalendarContainer>
        <MonthContainer>
          <Month month={selectedMonth} year={selectedYear} />
          <Month
            month={(selectedMonth + 1) % 12}
            year={selectedYear + Math.floor((selectedMonth + 1) / 12)}
          />
        </MonthContainer>
      </CalendarContainer>
    </CalendarComponentContainer>
  );
}
