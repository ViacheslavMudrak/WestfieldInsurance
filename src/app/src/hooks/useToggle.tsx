import { useState, useCallback } from 'react';

// https://usehooks.com/useToggle/
const useToggle = (initialState = false): [boolean, (x?: boolean) => void] => {
  // Initialize the state
  const [state, setState] = useState(initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback((x?: boolean) => setState((state) => x ?? !state), []);

  return [state, toggle];
};

export default useToggle;
