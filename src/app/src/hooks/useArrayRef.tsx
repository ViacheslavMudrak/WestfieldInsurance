import { MutableRefObject, useRef } from 'react';

/* Hook to hold a ref containing an array of elements */
const useArrayRef = <T,>(): [MutableRefObject<T[]>, (el: T) => void] => {
  const refs = useRef<T[]>([]);
  const addToRefs = (el: T) => refs.current.push(el);

  return [refs, addToRefs];
};

export default useArrayRef;
