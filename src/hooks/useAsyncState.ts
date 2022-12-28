import { useState } from "react";

export const useAsyncState = (initialState: any) => {
  const [state, setState] = useState(initialState);

  const asyncSetState = (value: any) => {
    return new Promise((resolve) => {
      setState(value);
      setState((current: any) => {
        resolve(current);
        return current;
      });
    });
  };

  return [state, asyncSetState];
};
