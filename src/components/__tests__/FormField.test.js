import React from "react";
import { fireEvent, render } from "@testing-library/react";

// Components
import { FormField } from "../FormField";

const TestComponent = ({ value, onChange, onFocus, dirty, touched, error }) => {
  const handleChange = (e) => onChange(e);
  const handleFocus = () => onFocus();

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        data-testid="input-elem"
        data-touched={touched}
        data-dirty={dirty}
        data-error={error}
      />
    </div>
  );
};

describe("FormField", () => {
  test("should render correctly when given a component", () => {
    const { getByDisplayValue } = render(
      <FormField component={TestComponent} initialValue="something" />
    );

    expect(getByDisplayValue("something")).toBeTruthy();
  });

  test("should update component when altered", () => {
    const { getByDisplayValue } = render(
      <FormField component={TestComponent} initialValue="something" />
    );

    fireEvent.change(getByDisplayValue("something"), {
      target: {
        value: "something else",
      },
    });

    expect(getByDisplayValue("something else")).toBeTruthy();
  });

  test("should be dirty once value is changed", () => {
    const { getByTestId } = render(
      <FormField component={TestComponent} initialValue="something" />
    );

    const inputElem = getByTestId("input-elem");
    
    expect(inputElem.getAttribute("data-dirty")).toBe("false");

    fireEvent.change(inputElem, { target: { value: "something else" } });

    expect(inputElem.getAttribute("data-dirty")).toBe("true");
  });

  test("should be touched once component is focused", () => {
    const { getByTestId } = render(
      <FormField component={TestComponent} initialValue="something" />
    );

    const inputElem = getByTestId("input-elem");

    expect(inputElem.getAttribute("data-touched")).toBe("false");

    fireEvent.focus(inputElem);

    expect(inputElem.getAttribute("data-touched")).toBe("true");
  });

  test("should set error prop with message when validation fails", () => {
    const validator = (value) => {
      return value !== "something" && "Something other than something.";
    };

    const { getByTestId } = render(
      <FormField
        component={TestComponent}
        initialValue=""
        validation={validator}
      />
    );

    const inputElem = getByTestId("input-elem");
    fireEvent.change(inputElem, { target: { value: "not something" } });

    expect(inputElem.getAttribute("data-error")).toBe(
      "Something other than something."
    );
  });

  test("should set error prop to an empty string when input valid", () => {
    const validator = (value) => {
      return value !== "something" && "Something other than something.";
    };

    const { getByTestId } = render(
      <FormField
        component={TestComponent}
        initialValue=""
        validation={validator}
      />
    );

    const inputElem = getByTestId("input-elem");
    fireEvent.change(inputElem, { target: { value: "something" } });

    expect(inputElem.getAttribute("data-error")).toBe("");
  });
});
