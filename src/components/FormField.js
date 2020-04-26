import React, { useEffect, useState } from "react";

export function FormField({
  component: Component,
  initialValue,
  validation,
  ...otherProps
}) {
  const [capturedInitialValue] = useState(() => initialValue);
  const [value, setValue] = useState(() => initialValue);
  const [dirty, setDirty] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    !dirty && capturedInitialValue !== value && setDirty(true);

    if (validation) {
      const validationResult = validation(value);
      setError(validationResult || "");
    }
  }, [capturedInitialValue, dirty, touched, validation, value]);

  const handleFocus = () => setTouched(true);

  const handleChange = (e) => setValue(e.target.value);

  return (
    <Component
      {...otherProps}
      onFocus={handleFocus}
      onChange={handleChange}
      value={value}
      dirty={dirty}
      touched={touched}
      error={error}
    />
  );
}
