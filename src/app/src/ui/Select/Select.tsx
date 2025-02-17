import classNames from 'classnames';
import React, { useState, useRef, useEffect, forwardRef, ForwardedRef } from 'react';
import useOnClickOutside from 'src/hooks/useOnClickOutside';
import { v4 } from 'uuid';
import styles from './select.module.scss';

type Option = {
  value: string;
  text: string;
};
type Props = {
  options: Option[];
  value?: string;
  name: string;
  onChange: (newValue: string) => void;
};

const Select = forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
  const { options, value, name, onChange } = props;
  const [isOpen, setOpen] = useState(false);
  const [selectUsed, setSelectUsed] = useState(false);
  const [selected, setSelected] = useState(value);
  const selectRef = useRef<HTMLDivElement>(null);
  const htmlSelect = useRef<HTMLSelectElement>(null);
  const selectId = v4() as string;

  useOnClickOutside(selectRef, () => {
    setOpen(false);
  });

  useEffect(() => {
    const element = htmlSelect.current;
    if (element && selectUsed) {
      element.value = selected as string;
    }
    onChange(selected as string);
  }, [onChange, selected, selectUsed]);

  return (
    <div ref={ref}>
      <div ref={selectRef} className={styles.customSelectWrapper}>
        <div className={classNames(styles.customSelect, isOpen ? styles.isOpen : '')}>
          <button
            role="combobox"
            value="Select"
            aria-controls={name + selectId}
            aria-haspopup="listbox"
            tabIndex={0}
            className={styles.customSelect__trigger}
            onClick={() => {
              setSelectUsed(true);
              setOpen(!isOpen);
            }}
            aria-expanded={isOpen}
          >
            <span>{options.find((item) => item.value === selected)?.text || 'Please Select'}</span>
            <div className={styles.arrow}></div>
          </button>
          <ul role="listbox" id={name + selectId} className={styles.customOptions}>
            {options.map((item, index) => (
              <li key={item.value}>
                <button
                  onClick={() => {
                    setOpen(false);
                    setSelected(item.value);
                  }}
                  className={classNames(
                    styles.optionContainer,
                    isOpen ? styles.optionContainerOpen : ''
                  )}
                  onBlur={() => {
                    if (index === options.length - 1) {
                      setOpen(false);
                    }
                  }}
                >
                  <span
                    className={classNames(
                      styles.customOption,
                      selected === item.value ? 'selected' : ''
                    )}
                    data-value={item.value}
                  >
                    {item.text}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
