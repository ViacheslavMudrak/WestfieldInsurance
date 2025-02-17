import classNames from 'classnames';
import { useEffect, useId, useRef, useState } from 'react';
import Expander from 'src/ui/Expander/Expander';
import styles from './accordion.module.scss';
import stylesVariant from './accordionVariant.module.scss';
import ChevronDown from '/src/assets/icons/chevron-down.svg';
import Plus from '/src/assets/icons/plus.svg';
import Minus from '/src/assets/icons/minus.svg';

export interface AccordionItemProps {
  heading: string | JSX.Element;
  body: string | JSX.Element;
  variant?: boolean;
  isEditing?: boolean;
}

export default function AccordionItem({
  heading,
  body,
  variant,
  isEditing = false,
}: AccordionItemProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (focus) {
      contentRef.current?.focus();
    }
  }, [focus]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    setFocus(!isOpen);
  };

  const getStyles = () => (variant ? stylesVariant : styles);

  const toggleIcon = () => {
    if (variant && isOpen) {
      return (
        <span className={classNames(getStyles().icon, getStyles().active)}>
          <Minus />
        </span>
      );
    }
    if (variant && !isOpen) {
      return (
        <span className={getStyles().icon}>
          <Plus />
        </span>
      );
    }
    return <ChevronDown className={classNames(getStyles().arrow, isOpen && getStyles().active)} />;
  };

  return (
    <div className={getStyles().accordionItem}>
      {isEditing && (
        <>
          <div
            className={classNames(getStyles().toggle, isOpen && getStyles().active)}
            aria-expanded={isOpen}
            aria-controls={id}
            data-testid="toggle"
          >
            <h3 className={getStyles().buttonText}>{heading}</h3>
            {toggleIcon()}
          </div>
          <Expander
            active={isOpen || isEditing}
            tabIndex={0}
            id={id}
            ref={contentRef}
            className={getStyles().content}
            data-testid="expander"
          >
            {body}
          </Expander>
        </>
      )}
      {!isEditing && (
        <>
          <button
            type="button"
            className={classNames(getStyles().toggle, isOpen && getStyles().active)}
            onClick={toggleAccordion}
            aria-expanded={isOpen}
            aria-controls={id}
            data-testid="toggle"
          >
            <h3 className={getStyles().buttonText}>{heading}</h3>
            {toggleIcon()}
          </button>
          <Expander
            active={isOpen || isEditing}
            tabIndex={0}
            id={id}
            ref={contentRef}
            className={getStyles().content}
            data-testid="expander"
          >
            {body}
          </Expander>
        </>
      )}
    </div>
  );
}
