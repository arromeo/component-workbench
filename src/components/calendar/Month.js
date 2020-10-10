import React from 'react';
import styled from 'styled-components';
import {
  checkIfCurrentMonth,
  checkIfPastMonth,
  getFirstDayOfMonth,
  getDaysInMonth
} from '../../modules/date-time';
import { MONTH_LABELS } from './constants';

const MonthContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;

const MonthTitle = styled.h5`
  font-size: 20px;
  margin-block-end: unset;
  margin-block-start: unset;
`;

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  margin-top: 1rem;
`;

const DayGridItem = styled.div`
  align-items: center;
  color: ${({ disabled }) => (disabled ? 'grey' : 'black')};
  display: flex;
  height: 2rem;
  justify-content: center;
  width: 2rem;
`;

const generateDays = (month, year) => {
  const firstDayOfMonth = getFirstDayOfMonth(month, year);
  const daysInMonth = getDaysInMonth(month, year);

  const currentDate = new Date().getDate();
  const isPastMonth = checkIfPastMonth(month, year);
  const isCurrentMonth = isPastMonth ? false : checkIfCurrentMonth(month, year);

  return Array.from(new Array(42)).map((_, index) => {
    const pastMonth = index < firstDayOfMonth;
    const nextMonth = index > daysInMonth + firstDayOfMonth - 1;

    const shouldBeDisabled =
      isPastMonth ||
      (isCurrentMonth && index - firstDayOfMonth + 1 < currentDate);

    return pastMonth || nextMonth ? (
      <DayGridItem key={index} />
    ) : (
      <DayGridItem disabled={shouldBeDisabled} key={index}>
        {index - firstDayOfMonth + 1}
      </DayGridItem>
    );
  });
};

function Month({ month, year }) {
  return (
    <MonthContainer>
      <MonthTitle>{MONTH_LABELS[month]}</MonthTitle>
      <DayGrid>{generateDays(month, year)}</DayGrid>
    </MonthContainer>
  );
}

export default Month;
