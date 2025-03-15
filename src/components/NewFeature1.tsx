// https://react.dev/reference/react/forwardRef

import React, { useImperativeHandle, useRef } from "react";

function CustomInput({ ref, ...props }) {
  const inpuRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      console.log("Focus called");
      (inpuRef.current as HTMLInputElement).focus();
    },
    clear: () => {
      console.log("Clear Called");
      (inpuRef.current as HTMLInputElement).value = "";
    },
  }));

  return <input type="text" ref={inpuRef} {...props} />;
}

export default function NewFeature1() {
  const inpuRef = useRef<HTMLInputElement | null>(null);

  function focusInput() {
    (inpuRef.current as HTMLInputElement).focus();
  }

  function clearInput() {
    (inpuRef.current as HTMLInputElement).clear();
  }

  return (
    <div>
      <CustomInput ref={inpuRef} />
      <button type="button" onClick={focusInput}>
        Focus
      </button>
      <button type="button" onClick={clearInput}>
        Clear
      </button>
    </div>
  );
}
