import classNames from 'classnames';
import styles from './search.module.scss';
import {
  AtomicSearchBox,
  AtomicSearchInterface,
  buildSearchEngine,
  getOrganizationEndpoints,
} from '@coveo/atomic-react';
import React from 'react';

export interface SearchProps {
  children?: React.ReactNode;
  className?: string;
  accessToken?: string;
  organizationId?: string;
}

const searchboxStyles = `
  atomic-search-box::part(wrapper) {
    border-radius: 25px;
    border-color: #949494;
  }
  atomic-search-box::part(input) {
    color: #4D514D;
  }
  atomic-search-box::part(suggestions-wrapper) {
    border-radius: 10px;
    border-color: #949494;
    color: #4D514D;
    background: white;
    margin-top: 4px;
  }
  atomic-search-box::part(submit-icon) {
    color: #E03100;
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;

export default function Search(props: SearchProps): JSX.Element {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    // This forces a rerender, so the data is rendered
    // the second time but not the first
    setHydrated(true);
  }, []);

  if (!hydrated || props.accessToken === undefined || props.organizationId === undefined) {
    return <></>;
  }
  const engine = buildSearchEngine({
    configuration: {
      accessToken: props.accessToken,
      organizationId: props.organizationId,
      organizationEndpoints: getOrganizationEndpoints(props.organizationId),
    },
  });

  return (
    <span className={classNames(styles.search, props.className)}>
      <AtomicSearchInterface
        engine={engine}
        searchHub="search"
        localization={(i18n) => {
          i18n.addResourceBundle('en', 'translation', {
            search: 'Keyword or phrase',
          });
        }}
      >
        <style>{searchboxStyles}</style>
        <AtomicSearchBox redirectionUrl="/search" />
      </AtomicSearchInterface>
    </span>
  );
}
