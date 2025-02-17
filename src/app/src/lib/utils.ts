import React from 'react';
import { ElementDocumentPosition } from 'src/types/generic';

/* Check to see if 2 components are of the same type */
export const enforceComponentType = (
  component1: React.ReactNode,
  component2: React.ReactNode | React.ComponentType,
  message: string
): void => {
  React.Children.forEach(component1, (child) => {
    if (React.isValidElement(child) && process.env.NODE_ENV === 'development') {
      if (child.type.toString() !== component2?.toString() && child.type !== React.Fragment) {
        throw new Error(message);
      }
    }
  });
};

/* Convert CSS time value to a number in milliseconds. "0.18s" => 180 */
export const cssTimeToMs = (time: string): number => {
  const unit = time.match(/m?s/)?.[0];
  const convertedNum = parseFloat(time.replace(/[^\d.-]/g, ''));
  let ms: number;

  switch (unit) {
    case 's': // seconds
      ms = convertedNum * 1000;
      break;
    case 'ms': // ms
      ms = convertedNum;
      break;
    default:
      ms = 0;
      break;
  }

  return ms;
};

export const getElementPosition = (el: Element): ElementDocumentPosition => {
  const box = el.getBoundingClientRect();

  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = docEl.scrollTop || body.scrollTop;
  const scrollLeft = docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const offTop = box.top + scrollTop - clientTop;
  const offLeft = box.left + scrollLeft - clientLeft;

  return { top: offTop, left: offLeft };
};
