import { ComponentRendering, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { GetDictionaryPhrase } from 'components/Helpers/ContentUtil';
import React from 'react';
import SearchResults from 'src/ui/SearchResults/SearchResults';
import SearchResultsGrid, { SearchInterfaceProps } from 'src/ui/SearchResults/SearchResultsGrid';

interface tagFolder {
  id: string;
  name: string;
  displayName: string;
}

interface searchTags {
  targetItems: {
    name: string;
    tagFolder: tagFolder;
  }[];
}

interface item {
  title: Field<string>;
  searchEngine: {
    targetItem: targetItem;
  };
  tags: searchTags;
  facets: {
    targetItems: {
      name: string;
      displayName: string;
    }[];
  };
  includeAlphaSortFacet: boolValue;
  includeDateRangeFacet: boolValue;
}

interface boolValue {
  boolValue: boolean;
}

interface targetItem {
  accessToken: Field<string>;
  organizationId: Field<string>;
}

interface data {
  item: item;
}

interface fields {
  data: data;
}

type SearchInterfaceDataProps = {
  params: { [key: string]: string };
  rendering: ComponentRendering;
  fields: fields;
};

const SearchInterfaceEmptyMarkup = (searchEngineText: string): JSX.Element => (
  <span className="is-empty-hint">{searchEngineText}</span>
);

const SearchInterfaceMarkup = (props: SearchInterfaceDataProps, isGrid: boolean): JSX.Element => {
  const filterResultsLabel = GetDictionaryPhrase('filter-results');
  const openFacetsLabel = GetDictionaryPhrase('open-facets');
  const closeFacetsLabel = GetDictionaryPhrase('close-facets');
  const selectSearchEngineText = GetDictionaryPhrase('select-search-engine');
  const searchResource = GetDictionaryPhrase('search-resource-search');
  const searchResourceStart = GetDictionaryPhrase('search-resource-start');
  const searchResourceEnd = GetDictionaryPhrase('search-resource-end');
  const defaultFeauturedResultLabel = GetDictionaryPhrase('default-featured-result-button');
  const videoFeauturedResultLabel = GetDictionaryPhrase('video-featured-result-button');
  const pdfFeauturedResultLabel = GetDictionaryPhrase('pdf-featured-result-button');
  if (
    props.fields.data.item.searchEngine === null ||
    props.fields.data.item.searchEngine?.targetItem?.accessToken?.value === null ||
    props.fields.data.item.searchEngine?.targetItem?.organizationId?.value === null
  ) {
    return SearchInterfaceEmptyMarkup(selectSearchEngineText);
  }

  const SearchInterfaceDefaultComponent = (): JSX.Element => (
    <span className="is-empty-hint">{selectSearchEngineText}</span>
  );
  if (props.fields) {
    const searchInterface: SearchInterfaceProps = {
      title: props.fields.data.item.title.value,
      facets: props.fields.data.item.facets.targetItems,
      includeAlphaSortFacet: props.fields.data.item.includeAlphaSortFacet.boolValue,
      includeDateRangeFacet: props.fields.data.item.includeDateRangeFacet.boolValue,
      organizationId: props.fields.data.item.searchEngine.targetItem.organizationId.value,
      accessToken: props.fields.data.item.searchEngine.targetItem.accessToken.value,
      searchTags: props.fields.data.item.tags.targetItems,
      filterResultsLabel: filterResultsLabel,
      openFacetsLabel: openFacetsLabel,
      closeFacetsLabel: closeFacetsLabel,
      searchResource: searchResource,
      searchResourceStart: searchResourceStart,
      searchResourceEnd: searchResourceEnd,
      defaultFeadturedButton: defaultFeauturedResultLabel,
      vidoeFeadturedButton: videoFeauturedResultLabel,
      pdfFeadturedButton: pdfFeauturedResultLabel,
    };
    if (!isGrid) {
      return <SearchResults {...searchInterface} />;
    } else {
      return <SearchResultsGrid {...searchInterface} />;
    }
  }

  return <SearchInterfaceDefaultComponent />;
};

export const Default = (props: SearchInterfaceDataProps): JSX.Element => {
  return SearchInterfaceMarkup(props, false);
};

export const Grid = (props: SearchInterfaceDataProps): JSX.Element => {
  return SearchInterfaceMarkup(props, true);
};
