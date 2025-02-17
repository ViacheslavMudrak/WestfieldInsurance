import {
  AtomicBreadbox,
  AtomicFacet,
  AtomicLoadMoreResults,
  AtomicQuerySummary,
  AtomicResultImage,
  AtomicResultList,
  AtomicResultSectionExcerpt,
  AtomicResultSectionTitle,
  AtomicResultSectionVisual,
  AtomicResultText,
  AtomicSearchBox,
  AtomicSearchInterface,
  AtomicSortDropdown,
  AtomicSortExpression,
  AtomicTimeframeFacet,
  Result,
  buildSearchEngine,
  loadAdvancedSearchQueryActions,
} from '@coveo/atomic-react';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import Col from 'src/ui/Grid/Col';
import Container from 'src/ui/Grid/Container';
import Row from 'src/ui/Grid/Row';
import VideoModalWrapper from '../VideoModal/VideoModalWrapper';
import styles from './search-results-grid.module.scss';

export type SearchInterfaceProps = {
  organizationId: string;
  accessToken: string;
  facets?: {
    name: string;
    displayName: string;
  }[];
  searchTags?: {
    name: string;
    tagFolder: {
      id: string;
      name: string;
      displayName: string;
    };
  }[];
  includeAlphaSortFacet?: boolean;
  includeDateRangeFacet?: boolean;
  openFacetsLabel?: string;
  closeFacetsLabel?: string;
  filterResultsLabel?: string;
  searchResource?: string;
  searchResourceStart?: string;
  searchResourceEnd?: string;
  defaultFeadturedButton?: string;
  vidoeFeadturedButton?: string;
  pdfFeadturedButton?: string;
  title?: string | JSX.Element;
};

export type FeaturedResultLabels = {
  defaultFeadturedButton: string;
  videoFeadturedButton: string;
  pdfFeadturedButton: string;
};

const interfaceStyles = `
  atomic-search-interface {
    background-color: #f2f2f2;
  }
  atomic-query-summary {
    display: flex;
    align-items: center;
    margin-right: 20px;
    flex-shrink: 0;
    color: #4d514d;
  }
  atomic-query-summary::part(container) {
    white-space: nowrap;
  }
`;

const sortSummaryStyles = `
  atomic-query-summary {
    margin-left: 10px;
  }
`;

const sortDropdownStyles = `
  atomic-sort-dropdown::part(select) {
    border: 1px solid #949494;
    border-radius: 4px;
    color: #4d514d;
    height: 50px;
    width: 140px;
    padding-right: 0;
  }
  atomic-sort-dropdown::part(select):focus {
    outline: 1px solid #4D514D;
    outline-offset: 1px;
  }
  atomic-sort-dropdown::part(select-separator) {
    border: none;
  }
  atomic-sort-dropdown::part(label) {
    overflow: hidden;
    margin: 0 5px 0 0;
    padding: 0;
    border: 0;
    transition: none;
    color: #4d514d;
  }
  @media (min-width: 768px) {
    atomic-sort-dropdown::part(select) {
      width: 160px;
    }
  }
  @media (min-width: 1200px) {
    atomic-sort-dropdown::part(select) {
      width: 210px;
    }
  }
`;

const facetsStyles = `
  atomic-facet::part(facet),
  atomic-facet::part(placeholder),
  atomic-timeframe-facet::part(facet),
  atomic-timeframe-facet::part(placeholder),
  .styledFacet {
    border: none;
    border-bottom: 1px solid #f2f2f2;
    padding: 0 0;
  }
  atomic-facet::part(label-button),
  atomic-timeframe-facet::part(label-button)  {
    padding: 20px 0 24px;
    font-size: 16px;
  }
  atomic-facet::part(label-button)[aria-expanded='true'],
  atomic-timeframe-facet::part(label-button)[aria-expanded='true'] {
    display: inline-block;
  }
  atomic-facet::part(label-button-icon),
  atomic-timeframe-facet::part(label-button-icon) {
    margin-right: 15px;
    color: #d62700;
  }
  atomic-timeframe-facet::part(input-label) {
    grid-column: 2;
    margin-left: -1rem;
    font-size: 14px;
    line-height: 1;
  }
  atomic-timeframe-facet::part(input-start) {
    grid-row: 2;
    grid-column: 2;
    margin-left: -1rem;
    margin-bottom: .5rem;
    border-color: #949494;
    border-radius: 4px;
    text-transform: uppercase;
    color: #4d514d;
  }
  atomic-timeframe-facet::part(input-end) {
    grid-row: 4;
    grid-column: 2;
    margin-left: -1rem;
    border-color: #949494;
    border-radius: 4px;
    text-transform: uppercase;
    color: #4d514d;
  }
  atomic-timeframe-facet::part(input-apply-button) {
    margin-left: -.5rem;
    margin-top: 1rem;
    border: none;
    color: white;
    background: #d62700;
    font-size: .875rem;
    line-height: 1rem;
    font-weight: 700;
    letter-spacing: .15em;
    transition: all .25s ease-in-out;
    height: 50px;
    border-radius: 0.25rem;
    text-transform: uppercase;
  }
  atomic-timeframe-facet::part(input-apply-button):hover,
  atomic-timeframe-facet::part(input-apply-button):focus {
    background: #c81e00;
  }
  atomic-timeframe-facet::part(input-apply-button):focus {
    outline: 2px solid #4D514D;
    outline-offset: 1px;
  }
  atomic-timeframe-facet::part(clear-button) {
    display: none;
  }
  @media (min-width: 768px) {
    atomic-facet::part(facet),
    atomic-timeframe-facet::part(facet),
    .styledFacet {
      border-bottom: none;
    }
    .timeFacetWrapper {
      flex: 1;
      position: relative;
    }
    .timeFacetWrapper:has(.atomic-hidden) {
      display: none;
    }
    .timeFacetWrapper atomic-timeframe-facet::part(facet) {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background: white;
      box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.15);
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    atomic-facet::part(label-button),
    atomic-timeframe-facet::part(label-button) {
      font-weight: 700;
      padding: 18px 20px 18px 22px;
      box-shadow: inset -2px 0 0 0 #f2f2f2, 0 4px 0 0 #d62700;
      position: relative;
      z-index: 1;
      color: #333;
    }
    atomic-facet::part(label-button-icon),
    atomic-timeframe-facet::part(label-button-icon) {
      display: none;
    }
    atomic-facet::part(values) {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      background: white;
      margin: 0 0;
      padding: 15px 23px 20px;
      border-radius: 0 0 4px 4px;
      box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.15);
    }
    atomic-timeframe-facet::part(input-label) {
      margin-left: .5rem;
      margin-top: .5rem;
    }
    atomic-timeframe-facet::part(input-start) {
      margin-left: .5rem;
      margin-right: 1rem;
      margin-bottom: 0;
    }
    atomic-timeframe-facet::part(input-end) {
      margin-left: .5rem;
      margin-right: 1rem;
    }
    atomic-timeframe-facet::part(input-apply-button) {
      margin-left: 1rem;
      margin-right: 1rem;
      margin-bottom: 2rem;
    }
  }

  @media (min-width: 1199px) {
    atomic-facet::part(label-button),
    atomic-timeframe-facet::part(label-button) {
      padding: 31px 20px 31px 30px;
    }
  }
  atomic-facet::part(clear-button) {
    display: none;
  }
  atomic-facet::part(value-checkbox) {
    border-radius: 2px;
  }
  atomic-facet::part(value-checkbox):hover,
  atomic-facet::part(value-checkbox):focus {
    outline: 1px solid #d62700;
    outline-offset: 1px;
  }
  atomic-facet::part(value-checkbox-checked) {
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_2935_5368)'%3E%3Cpath d='M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z' fill='%23D62700'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_2935_5368'%3E%3Crect width='24' height='24' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
    width: 16px;
    height: 16px;
    bacground-size: 16px 16px;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const resultListStyles = `
  atomic-result-list::part(outline)::before {
    margin: 0;
  }
  atomic-result-list::part(result-list) {
    display: flex;
    padding: 20px 0;
  }
  atomic-result-list::part(outline) {
    background: white;
    box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    padding: 0 20px;
    position: relative;
  }
  @media (min-width: 768px) {
    atomic-result-list::part(result-list) {
      flex-wrap: wrap;
      flex-direction: row;
      gap: 20px;
    }
    atomic-result-list::part(outline) {
      display: inline-block;
    }
  }
  @media (min-width: 1200px) {
    atomic-result-list::part(result-list) {
      gap: 30px;
      padding: 30px 0;
    }
    atomic-result-list::part(outline) {
      padding: 0 30px;
    }
  }
`;

const resultStyles = `
  .result-root {
    padding: 20px 0;
    display: flex !important;
    gap: 20px;
    flex-direction: column;
  }
  .result-root dialog[open] {
    box-shadow: 0 10px 40px 0 rgba(0,0,0,.15);
    border-radius: 4px;
  }
  .result-root dialog[open] button {
    position: absolute;
    right: 5px;
    top: 5px;

    @media (min-width: 768px) {
      right: 15px;
      top: 15px;
    }
  }
  .result-root dialog[open] .sr-only {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    margin: -1px;
    padding: 0;
    border: 0;
    width: 1px;
    height: 1px;
    transition: none;
  }
  .result-root dialog[open] button svg {
    height: 10px;
    width: 10px;
    fill: #000;

    @media (min-width: 768px) {
      height: 20px;
      width: 20px;
    }
  }
  .result-root dialog[open] [class*=modal_wrapper] {
    padding: 1rem;

    @media (min-width: 768px) {
      padding: 3rem 2rem 2rem;
    }
  }
  .result-root dialog[open] [class*=iframeWrapper] {
    position: relative;
    padding-bottom: 56.25%;
    width: 80vw;
  }
  @media (min-width: 768px) {
    .result-root dialog[open] [class*=iframeWrapper] {
      width: 50vw;
    }
  }
  .result-root dialog[open] [class*=iframeWrapper] iframe {
      border: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
  }
  .result-title {
    overflow: visible !important;
  }
  .result-title a,
  .result-title [class*='openModalButton'] {
    color: #4D514D !important;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px !important;
  }
  .result-title a::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    content: '';
  }
  .result-title a:hover,
  .result-title a:focus {
    color: #4D514D;
  }
  .result-title [class*='openModalButton']:hover,
  .result-title [class*='openModalButton']:focus {
    text-decoration: underline;
  }
  .result-content {
    flex-grow: 1;
  }
  .result-excerpt {
    color: #4D514D !important;
    font-size: 16px !important;
    font-style: normal;
    font-weight: 400;
    line-height: 24px !important;
    margin-top: 10px !important;
    max-height: 100vh !important;
    display: block !important;
  }
  .result-image, .pdf-image, .video-image {
    display: block;
    width: 100% !important;
    height: 100% !important;
    margin-right: 0 !important;
    flex: 0 0 250px;
  }
  .result-image img {
    object-fit: cover !important;
    height: auto;
    aspect-ratio: 1.33;
  }
  .pdf-image img {
    aspect-ratio: 1.33;
  }
  .video-image img {
    aspect-ratio: 1.33;
  }
  .result-root dialog[open] {
    box-shadow: 0 10px 40px 0 rgba(0,0,0,.15);
    border-radius: 4px;
  }
  .result-root dialog[open] button {
    position: absolute;
    right: 5px;
    top: 5px;

    @media (min-width: 768px) {
      right: 15px;
      top: 15px;
    }
  }
  .result-root dialog[open] .sr-only {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    margin: -1px;
    padding: 0;
    border: 0;
    width: 1px;
    height: 1px;
    transition: none;
  }
  @media (min-width: 768px) {
    .result-root {
      height: 100%;
      width: 313px;
    }
    .result-title a {
      font-size: 21px;
      line-height: 24.6px !important;
    }
    .result-image, .pdf-image, .video-image {
      flex: 0 0 140px;
    }
  }
  @media (min-width: 960px) {
    .result-root {
      width: 253px;
    }
  }
  @media (min-width: 992px) {
    .result-image, .pdf-image, .video-image {
      flex: 0 0 200px;
    }
  }
  @media (min-width: 1200px) {
    .result-root {
      padding: 30px 0;
      width: 306px;
    }
    .result-title a {
      font-size: 24px;
      line-height: 28.1px !important;
    }
    .result-excerpt {
      font-size: 18px !important;
      line-height: 28px !important;
    }
    .result-image, .pdf-image, .video-image {
      flex: 0 0 230px;
    }
  }
  @media (min-width: 1440px) {
    .result-root {
      width: 381px;
    }
    .result-image, .pdf-image, .video-image {
      flex: 0 0 293px;
    }
  }
  @media (min-width: 1455px) {
    .result-root {
      width: 386px;
    }
  }
`;

const featuredStyles = `
  .result-root {
    padding: 20px 0;
    display: flex !important;
    gap: 20px;
    flex-direction: column;
    width: 100%;
  }
  .result-excerpt {
    color: #4D514D !important;
    font-size: 16px !important;
    font-style: normal;
    font-weight: 400;
    line-height: 24px !important;
    margin-top: 10px !important;
    max-height: 100vh !important;
    display: block !important;
  }
  .result-image {
    display: block;
    width: 100% !important;
    height: 100% !important;
    margin-right: 0 !important;
    flex: 0 0 250px;
  }
  .result-image img {
    object-fit: cover !important;
    height: auto;
    aspect-ratio: 1.33;
  }
  .result-root dialog[open] button svg {
    height: 10px;
    width: 10px;
    fill: #000;

    @media (min-width: 768px) {
      height: 20px;
      width: 20px;
    }
  }
  .result-root dialog[open] [class*=modal_wrapper] {
    padding: 1rem;
  }
  .result-root dialog[open] [class*=iframeWrapper] {
    position: relative;
    padding-bottom: 56.25%;
    width: 80vw;
  }
  .result-root dialog[open] [class*=transcriptLink] a {
    font-size: 18px !important;
    color: rgb(77, 81, 77) !important;
    text-decoration: underline !important;
    line-height: 27px !important;
  }
  .result-root dialog[open] [class*=iframeWrapper] iframe {
      border: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
  }
  .result-title {
    overflow: visible !important;
  }
  atomic-result-section-title,
  .result-title a,
  .result-title [class*='openModalButton'] {
    color: #4D514D !important;
    font-size: 20px !important;
    font-style: normal !important;
    font-weight: 700 !important;
    line-height: 24px !important;
  }
  .result-title a::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    content: '';
  }
  .result-title a:hover,
  .result-title a:focus {
    color: #4D514D;
  }
  .result-title [class*='openModalButton']:hover,
  .result-title [class*='openModalButton']:focus {
    text-decoration: underline;
  }
  .result-content {
    flex-grow: 1;
  }
  .result-excerpt {
    color: #4D514D !important;
    font-size: 16px !important;
    font-style: normal;
    font-weight: 400;
    line-height: 24px !important;
    margin-top: 10px !important;
    max-height: 100vh !important;
    display: block !important;
  }
  .result-image img {
    object-fit: cover !important;
    height: auto;
    aspect-ratio: 1.33;
  }
  .result-root dialog[open] {
    box-shadow: 0 10px 40px 0 rgba(0,0,0,.15);
    border-radius: 4px;
  }
  .result-root dialog[open] button {
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .result-root dialog[open] .sr-only {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    margin: -1px;
    padding: 0;
    border: 0;
    width: 1px;
    height: 1px;
    transition: none;
  }

  .featuredWrap {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .featuredBtn {
    height: 50px;
    border-radius: 4px;
    text-decoration: none;
    font-size: 14px;
    line-height: 50px;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: white;
    background: #d62700;
    padding: 0 20px;
    text-transform: uppercase;
    margin: 10px 0;
    display: inline-block;
  }
  .featuredBtn:hover, .featuredBtn:focus {
    background: #c81e00;
    color: white;
    text-decoration: none;
  }
  .featuredBtn:focus {
    outline: 2px solid #4D514D;
    outline-offset: 1px;
    transform: scale(0.98);
  }
  @media (min-width: 768px) {
    .result-root {
      width: 687px;
    }
    atomic-result-section-title,
    .result-title a {
      font-size: 21px !important;
      line-height: 24.6px !important;
    }
    .result-root dialog[open] [class*=iframeWrapper] {
      width: 50vw;
    }
    .result-root dialog[open] [class*=modal_wrapper] {
      padding: 3rem 2rem 2rem;
    }
    .result-root dialog[open] button {
      right: 15px;
      top: 15px;
    }
  }
  @media (min-width: 960px) {
    .result-root {
      width: 880px;
      padding: 30px 0;
    }
    .featuredWrap {
      flex-direction: row;
      align-items: center;
      gap: 40px;
    }
    atomic-result-section-title,
    .result-title a,
    .result-title [class*='openModalButton'] {
      font-weight: 300 !important;
      text-decoration: none !important;
      font-size: 30px !important;
    }
    .result-image {
      flex: 0 0;
      flex-basis: calc(50% - 30px);
    }
  }
  @media (min-width: 1200px) {
    .result-root {
      width: 1099px;
    }
    .result-title a,
    .result-title [class*='openModalButton'] {
      font-size: 50px;
      line-height: 65px !important;
    }
    .result-excerpt {
      font-size: 18px !important;
      line-height: 28px !important;
    }
    .featuredWrap {
      gap: 60px;
      padding-right: 60px;
    }
  }
  @media (min-width: 1440px) {
    .result-root {
      width: 1322px;
    }
  }
  @media (min-width: 1455px) {
    .result-root {
      width: 1340px;
    }
  }
`;

const loadMoreStyles = `
  atomic-load-more-results::part(showing-results) {
    display: none;
  }
  atomic-load-more-results::part(load-more-results-button):focus {
    outline: 2px solid #4D514D;
    outline-offset: 1px;
  }
`;

const searchboxStyles = `
  atomic-search-box::part(wrapper) {
    border-radius: 25px;
    border-color: #949494;
    background: #fff;
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
  atomic-search-box::part(submit-button) {
    border-radius: 0 25px 25px 0;
  }
  atomic-search-box::part(submit-button):hover,
  atomic-search-box::part(submit-button):focus {
    outline: 1px solid #d62700;
  }
`;

const breadboxStyles = `
  atomic-breadbox::part(label) {
    display: none;
  }
  atomic-breadbox::part(breadcrumb-list) {
    position: relative;
    padding: 20px 0;
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
  }
  atomic-breadbox::part(clear) {
    padding-left: 16px;
    padding-right: 16px;
  }
  atomic-breadbox::part(breadcrumb-button),
  atomic-breadbox::part(clear) {
    background: white;
    font-size: 14px;
    line-height: 17px;
    border: none;
    border-radius: 25px;
  }
  atomic-breadbox::part(clear):hover,
  atomic-breadbox::part(clear):focus,
  atomic-breadbox::part(breadcrumb-button):hover,
  atomic-breadbox::part(breadcrumb-button):focus {
    box-shadow: inset 0 0 5px 2px #d62700;
  }
  atomic-breadbox::part(breadcrumb-clear) {
    fill: #d62700;
  }
`;

const SearchInterfaceMarkup = (props: SearchInterfaceProps): JSX.Element => {
  const [facetsMobileShown, setFacetsMobileShown] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [topResult, setTopResult] = useState<Result>();

  const featuredResultLabels = {
    defaultFeadturedButton: props.defaultFeadturedButton ?? '',
    videoFeadturedButton: props.vidoeFeadturedButton ?? '',
    pdfFeadturedButton: props.pdfFeadturedButton ?? '',
  } as FeaturedResultLabels;

  function onSearchSubscribe() {
    const state = engine.state;
    setTopResult(state.search.results[0]);
  }

  const topResultRef = useRef<Result | undefined>(topResult);

  useEffect(() => {
    topResultRef.current = topResult;
  }, [topResult]);

  useEffect(() => {
    window.addEventListener('resize', reportWindowSize);
  });

  function reportWindowSize() {
    let zoom = Math.round((window?.outerWidth / window.innerWidth) * 100) / 100;

    const userAgent = navigator.userAgent;
    if (userAgent.match(/firefox|fxios/i)) {
      zoom = window.devicePixelRatio;
    }
    if (zoom && zoom > 1.7) {
      setZoomed(true);
    } else {
      setZoomed(false);
    }
  }

  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    // This forces a rerender, so the data is rendered
    // the second time but not the first
    setHydrated(true);
  }, []);

  const engine = buildSearchEngine({
    configuration: {
      accessToken: props.accessToken,
      organizationId: props.organizationId,
    },
  });

  // build the aq string
  if (props.searchTags) {
    let query = '';
    props.searchTags.forEach(function (tag) {
      query += '@' + tag.tagFolder.name.toLowerCase().replace(' ', '') + '=' + tag.name + ' | ';
    });
    // this allows us to add pre-filtered expressions set by the search engine item in Sitecore
    const action = loadAdvancedSearchQueryActions(engine).updateAdvancedSearchQueries({
      aq: query,
    });
    engine.dispatch(action);
  }

  engine.subscribe(onSearchSubscribe);

  const toggleFacets = (show: boolean) => {
    if (show) {
      window.scroll({ top: 0, behavior: 'smooth' });
    }
    setFacetsMobileShown(show);
  };

  if (!hydrated) {
    return <></>;
  }

  return (
    <>
      <style>{interfaceStyles}</style>
      <AtomicSearchInterface
        engine={engine}
        languageAssetsPath="/lang"
        searchHub="searchResultsGrid"
        fieldsToInclude={[
          'image',
          'publisheddate',
          'filetype',
          'videothumbnail',
          'videodescription',
          'mobilevideotranscriptlink',
          'breadcrumbtitle',
        ]}
        localization={(i18n) => {
          i18n.addResourceBundle('en', 'translation', {
            search: props.searchResource,
            start: props.searchResourceStart,
            end: props.searchResourceEnd,
          });
        }}
      >
        <Container>
          <Row>
            <Col size={12} className={styles.searchInterfaceTop}>
              <style>{searchboxStyles}</style>
              <style>{facetsStyles}</style>
              <h1 className={styles.resultsPageTitle}>{props.title}</h1>
              <div className={styles.searchToolsWrap}>
                <button
                  className={styles.searchFacetsToggle}
                  onClick={() => toggleFacets(true)}
                  aria-expanded={facetsMobileShown}
                >
                  <span className="sr-only">{props.openFacetsLabel}</span>
                </button>
                <div
                  className={classNames(
                    styles.searchFacetsWrap,
                    zoomed ? styles.isZoomed : '',
                    facetsMobileShown ? styles.facetsMobileShown : styles.facetsMobileHidden
                  )}
                >
                  <div className={styles.facetsBox}>
                    <div className={styles.facetsMobile_top}>
                      <h2 className={styles.facetsMobile_header}>{props.filterResultsLabel}</h2>
                      <button
                        id="searchFacetsClose"
                        className={styles.searchFacetsClose}
                        onClick={() => toggleFacets(false)}
                        aria-expanded={facetsMobileShown}
                      >
                        <span className="sr-only">{props.closeFacetsLabel}</span>
                      </button>
                    </div>
                    {props.facets &&
                      props.facets.map((facet, i) => (
                        <AtomicFacet
                          headingLevel={2}
                          key={i}
                          field={facet.name.toLowerCase().replaceAll(' ', '')} //same way we are storing in Coveo extension
                          label={facet.displayName}
                          isCollapsed={true}
                          className={classNames(styles.styledFacet, 'styledFacet')}
                        />
                      ))}
                    {props.includeDateRangeFacet && (
                      <div className="timeFacetWrapper">
                        <AtomicTimeframeFacet
                          field="publisheddate"
                          label="Date Range"
                          className={classNames(styles.styledFacet, 'styledFacet')}
                          isCollapsed={true}
                          withDatePicker={true}
                          headingLevel={2}
                        />
                      </div>
                    )}
                    <button
                      className={styles.a11yFacetsClose}
                      onClick={() => toggleFacets(false)}
                      onBlur={() => toggleFacets(false)}
                      aria-expanded={facetsMobileShown}
                    >
                      {props.closeFacetsLabel}
                    </button>
                  </div>
                </div>
                <div className={styles.searchBoxWrap}>
                  <AtomicSearchBox clearFilters={false} />
                </div>
              </div>
            </Col>
            <Col size={12} className="test">
              <div className={styles.resultInfo}>
                <style>{sortDropdownStyles}</style>
                {props.includeAlphaSortFacet ? (
                  <AtomicSortDropdown>
                    <AtomicSortExpression label="Relevance" expression="relevancy" />
                    <AtomicSortExpression label="Newest" expression="publisheddate descending" />
                  </AtomicSortDropdown>
                ) : (
                  <AtomicSortDropdown>
                    <AtomicSortExpression label="Newest" expression="publisheddate descending" />
                    <AtomicSortExpression label="Relevance" expression="relevancy" />
                  </AtomicSortDropdown>
                )}
                <style>{sortSummaryStyles}</style>
                <AtomicQuerySummary />
              </div>
              <style>{breadboxStyles}</style>
              <AtomicBreadbox />
              <style>{resultListStyles}</style>
              {topResult && (
                <AtomicResultList
                  density="compact"
                  template={(result) =>
                    ResultTemplateFunction(result, topResultRef, featuredResultLabels)
                  }
                ></AtomicResultList>
              )}
              <style>{loadMoreStyles}</style>
              <AtomicLoadMoreResults />
            </Col>
          </Row>
        </Container>
      </AtomicSearchInterface>
    </>
  );
};

const ResultTemplateFunction = (
  result: Result,
  topResultRef: React.RefObject<Result | undefined>,
  featuredResultLabels: FeaturedResultLabels
) => {
  const topResult = topResultRef.current;
  return (
    <>
      {topResult && result.uniqueId === topResult.uniqueId ? (
        result.raw.filetype === 'Video' ? (
          <>
            <style>{featuredStyles}</style>
            <VideoFeaturedTemplate
              result={result}
              buttonLabel={featuredResultLabels.videoFeadturedButton}
            />
          </>
        ) : result.raw.filetype === 'pdf' ? (
          <>
            <style>{featuredStyles}</style>
            <PdfFeaturedTemplate
              result={result}
              buttonLabel={featuredResultLabels.pdfFeadturedButton}
            />
          </>
        ) : (
          <>
            <style>{featuredStyles}</style>
            <DefaultFeaturedTemplate
              result={result}
              buttonLabel={featuredResultLabels.defaultFeadturedButton}
            />
          </>
        )
      ) : result.raw.filetype === 'Video' ? (
        <>
          <style>{resultStyles}</style>
          <VideoTemplate result={result} />
        </>
      ) : result.raw.filetype === 'pdf' ? (
        <>
          <style>{resultStyles}</style>
          <PdfTemplate result={result} />
        </>
      ) : (
        <>
          <style>{resultStyles}</style>
          <DefaultTemplate result={result} />
        </>
      )}
    </>
  );
};

const DefaultFeaturedTemplate: React.FC<{ result: Result; buttonLabel: string }> = ({
  result,
  buttonLabel,
}) => {
  return (
    <div className="featuredWrap">
      <AtomicResultSectionVisual className="result-image">
        <AtomicResultImage field="image" />
      </AtomicResultSectionVisual>
      <div className="result-content">
        <AtomicResultSectionTitle className="result-title">
          <h2>
            <AtomicResultText field="title" />
          </h2>
        </AtomicResultSectionTitle>
        <AtomicResultSectionExcerpt className="result-excerpt">
          <AtomicResultText field="excerpt" />
          <br />
          <a href={result.uri} className="featuredBtn">
            {buttonLabel}
          </a>
        </AtomicResultSectionExcerpt>
      </div>
    </div>
  );
};

const VideoFeaturedTemplate: React.FC<{ result: Result; buttonLabel: string }> = ({
  result,
  buttonLabel,
}) => {
  return (
    <div className="featuredWrap">
      <AtomicResultSectionVisual className="result-image">
        <AtomicResultImage field="videothumbnail" />
      </AtomicResultSectionVisual>
      <div className="result-content">
        <AtomicResultSectionTitle className="result-title">
          <VideoModalWrapper
            src={result.uri}
            title={result.title}
            transcriptLink={
              (result.raw.mobilevideotranscriptlink
                ? result.raw.mobilevideotranscriptlink
                : '') as string
            }
          />
        </AtomicResultSectionTitle>
        <AtomicResultSectionExcerpt className="result-excerpt">
          <AtomicResultText field="videodescription" />
          <br />
          <VideoModalWrapper
            src={result.uri}
            title={buttonLabel}
            transcriptLink={
              (result.raw.mobilevideotranscriptlink
                ? result.raw.mobilevideotranscriptlink
                : '') as string
            }
          />
        </AtomicResultSectionExcerpt>
      </div>
    </div>
  );
};

const PdfFeaturedTemplate: React.FC<{ result: Result; buttonLabel: string }> = ({
  result,
  buttonLabel,
}) => {
  return (
    <div className="featuredWrap">
      <AtomicResultSectionVisual className="video-image">
        <AtomicResultImage field="image" />
      </AtomicResultSectionVisual>
      <div className="result-content">
        <AtomicResultSectionTitle className="result-title">
          <h2>
            <AtomicResultText field="title" />
          </h2>
        </AtomicResultSectionTitle>
        <AtomicResultSectionExcerpt className="result-excerpt">
          <AtomicResultText field="excerpt" />
          <br />
          <a href={result.uri} className="featuredBtn">
            {buttonLabel}
          </a>
        </AtomicResultSectionExcerpt>
      </div>
    </div>
  );
};

const DefaultTemplate: React.FC<{ result: Result }> = ({ result }) => {
  return (
    <>
      <AtomicResultSectionVisual className="result-image">
        <AtomicResultImage field="image" />
      </AtomicResultSectionVisual>
      <div className="result-content">
        <AtomicResultSectionTitle className="result-title">
          <h2>
            <a href={result.clickUri}>
              {(result.raw.breadcrumbtitle ? result.raw.breadcrumbtitle : result.title) as string}
            </a>
          </h2>
        </AtomicResultSectionTitle>
        <AtomicResultSectionExcerpt className="result-excerpt">
          <AtomicResultText field="excerpt" />
        </AtomicResultSectionExcerpt>
      </div>
    </>
  );
};

const PdfTemplate: React.FC<{ result: Result }> = ({ result }) => {
  return (
    <>
      <AtomicResultSectionVisual className="pdf-image">
        <AtomicResultImage field="image" />
      </AtomicResultSectionVisual>
      <div className="result-content">
        <AtomicResultSectionTitle className="result-title">
          <a href={result.clickUri} target="_blank">
            {result.title}
          </a>
        </AtomicResultSectionTitle>
        <AtomicResultSectionExcerpt className="result-excerpt">
          <AtomicResultText field="excerpt" />
        </AtomicResultSectionExcerpt>
      </div>
    </>
  );
};

const VideoTemplate: React.FC<{ result: Result }> = ({ result }) => {
  return (
    <>
      <AtomicResultSectionVisual className="result-image">
        <AtomicResultImage field="videothumbnail" />
      </AtomicResultSectionVisual>
      <div className="result-content">
        <AtomicResultSectionTitle className="result-title">
          <VideoModalWrapper
            src={result.uri}
            title={result.title}
            transcriptLink={
              (result.raw.mobilevideotranscriptlink
                ? result.raw.mobilevideotranscriptlink
                : '') as string
            }
          />
        </AtomicResultSectionTitle>
        <AtomicResultSectionExcerpt className="result-excerpt">
          <AtomicResultText field="videodescription" />
        </AtomicResultSectionExcerpt>
      </div>
    </>
  );
};

export default function SearchResultsGrid(props: SearchInterfaceProps): JSX.Element {
  return SearchInterfaceMarkup(props);
}
