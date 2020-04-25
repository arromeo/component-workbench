import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  ${({ disabled }) =>
    disabled
      ? `
          background-color: lightgray;
          color: black;
        `
      : `
          background-color: blue;
          color: white;
        `}
  border: none;
  border-radius: 4px;
  padding: 8px;
`;

export function Button({ children, ...otherProps }) {
  return <StyledButton {...otherProps}>{children}</StyledButton>;
}
