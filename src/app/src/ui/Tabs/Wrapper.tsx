import classNames from 'classnames';
import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import ChevronDownIcon from 'src/assets/icons/chevron-down.svg';
import useIsDesktop from '../../hooks/useIsDesktop';
import { enforceComponentType } from '../../lib/utils';
import Expander from '../Expander/Expander';
import Item, { TabsItemProps } from './Item';
import styles from './tabs.module.scss';

interface TabsWrapperProps extends React.ComponentProps<'div'> {
  children: React.ReactElement<typeof Item>[];
}

export default function TabsWrapper({ children, ...rest }: TabsWrapperProps): JSX.Element {
  enforceComponentType(children, Item, 'Children of Tabs.Wrapper must be a Tabs.Item component');

  const isDesktop = useIsDesktop();
  const [selectedTab, setSelectedTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const id = useRef(useId());
  const currentTab = useMemo(() => {
    return React.Children.toArray(children)[selectedTab];
  }, [children, selectedTab]);

  useEffect(() => {
    setMobileOpen(false);
  }, [selectedTab]);

  return (
    <div className={styles.wrapper} {...rest}>
      {!isDesktop && React.isValidElement<TabsItemProps>(currentTab) && (
        <button
          className={classNames(styles.selector, mobileOpen && styles.active)}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={`Currently on ${currentTab.props.title} tab`}
          aria-expanded={mobileOpen}
          aria-controls={id.current}
        >
          {currentTab.props.title}
          <ChevronDownIcon className={classNames(styles.arrow, mobileOpen && styles.active)} />
        </button>
      )}
      <Expander active={mobileOpen || isDesktop}>
        <div className={classNames(styles.tabs)} id={id.current}>
          {React.Children.map(children, (child, i) => {
            // Using isValidElement to get the correct type for child
            if (React.isValidElement<TabsItemProps>(child)) {
              return (
                <button
                  className={classNames(styles.tab, i === selectedTab && styles.active)}
                  onClick={() => setSelectedTab(i)}
                  aria-label={`Switch to ${child.props.title} tab`}
                  aria-controls={child.props.id}
                >
                  {child.props.title}
                </button>
              );
            }

            return;
          })}
        </div>
      </Expander>
      {currentTab}
    </div>
  );
}
