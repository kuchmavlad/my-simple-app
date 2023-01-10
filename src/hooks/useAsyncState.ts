import React, { useState } from "react";

export const useAsyncState = <T>(
  initialState: T
): [
  [T, React.Dispatch<React.SetStateAction<T>>][0],
  (value: T) => Promise<unknown>
] => {
  const [state, setState] = useState(initialState);

  const asyncSetState = (value: T) => {
    return new Promise((resolve) => {
      setState(value);
      setState((current: T) => {
        resolve(current);
        return current;
      });
    });
  };

  return [state, asyncSetState];
};
