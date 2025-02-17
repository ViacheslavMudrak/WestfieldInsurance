import {
  AtomicBreadbox,
  AtomicFacet,
  AtomicPager,
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
import React, { useEffect, useState } from 'react';
import FacetsIcon from 'src/assets/icons/facet-toggle.svg';
import Col from 'src/ui/Grid/Col';
import Container from 'src/ui/Grid/Container';
import Row from 'src/ui/Grid/Row';
import VideoModalWrapper from '../VideoModal/VideoModalWrapper';
import { SearchInterfaceProps } from './SearchResultsGrid';
import styles from './search-results.module.scss';

const resultListStyles = `
  atomic-result-list::part(outline) {
    padding: 0;
    border: none;
    border-radius: 0;
  }
  atomic-result-list::part(outline)::before {
    margin: 0;
  }
  atomic-result-list::part(result-list) {
    display: block;
    min-height: 650px;
  }
`;

const resultStyles = `
  .result-root {
    padding: 20px 0;
    border-bottom: 2px solid #f2f2f2;
    display: block !important;
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
  .result-root dialog[open] [class*=transcriptLink] {
    a {
      font-size: 18px !important;
      color: rgb(77, 81, 77) !important;
      text-decoration: underline;
      line-height: 27px;
      font-weight: normal;
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
  .result-title button,
  .result-title a  {
    color: #4D514D;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .result-title button:hover,
  .result-title a:hover,
  .result-title button:focus,
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
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    max-height: none !important;
    display: block !important;
    -webkit-line-clamp: unset !important;
    -webkit-box-orient: vertical;
  }
  .result-image, .pdf-image {
    display: block;
    width: 160px !important;
    height: 100% !important;
    margin-bottom: 20px !important;
    margin-right: 0 !important;
  }
  .result-image img {
    object-fit: cover !important;
  }
  .pdf-image img {
    max-height: 100px;
  }
  @media (min-width: 768px) {
    .result-root {
      display: flex !important;
      flex-direction: row-reverse !important;
    }
    .result-title button,
    .result-title a  {
      font-size: 21px;
    }
    .result-image, .pdf-image {
      margin-left: 30px !important;
      margin-right: 0 !important;
      margin-bottom: 0 !important;
      width: auto !important;
      min-width: 160px !important;
      width: 160px !important;
    }
  }
  @media (min-width: 1200px) {
    .result-title button,
    .result-title a  {
      font-size: 24px;
    }
    .result-image, .pdf-image {
      min-width: 210px !important;
      width: 210px !important;
    }
  }
`;

const pagerStyles = `
  atomic-pager {
    margin: 0 0 20px 0;
  }
  atomic-pager button:disabled {
    display: none;
  }
  atomic-pager::part(page-button) {
    border-radius: 50%;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
    border: 2px solid #666;
    color: #666;
    cursor: pointer;
    min-width: 36px;
    min-height: 36px;
    height: 36px;
    padding-top: 2px;
  }
  atomic-pager::part(active-page-button) {
    color: white;
    background: #666;
  }
  atomic-pager::part(previous-button),
  atomic-pager::part(next-button) {
    border-radius: 50%;
    color: white;
    background: #E03100;
    min-width: 36px;
    min-height: 36px;
    height: 36px;
  }
  button:disabled {
    display: none;
  }
  atomic-pager::part(page-button):focus,
  atomic-pager::part(previous-button):focus,
  atomic-pager::part(next-button):focus {
    outline: 1px solid #4d514d;
    outline-offset: 1px;
  }
`;

const searchboxStyles = `
  atomic-search-box {
    flex-grow: 1;
  }
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
  atomic-search-box::part(submit-button):focus {
    outline: 1px solid #4d514d;
    border-radius: 25px;
  }
`;

const facetStyles = `
  atomic-facet,
  atomic-timeframe-facet {
    margin-bottom: 5px;
  }
  atomic-timeframe-facet form {
    display: block;
  }
  atomic-facet::part(facet),
  atomic-facet::part(placeholder),
  atomic-timeframe-facet::part(facet),
  atomic-timeframe-facet::part(placeholder) {
    background: #F2F2F2;
    border: none;
  }
  atomic-facet::part(label-button),
  atomic-timeframe-facet::part(label-button) {
    color: #4D514D;
    font-size: 16px;
    font-weight: 700;
    padding-left: 0;
  }
  atomic-facet::part(label-button-icon),
  atomic-timeframe-facet::part(label-button-icon) {
    color: #E03100;
  }
  atomic-facet::part(value-checkbox) {
    color: #4D514D;
  }
  atomic-facet::part(value-checkbox):hover, 
  atomic-facet::part(value-checkbox):focus {
    outline: 1px solid #4D514D;
    outline-offset: 1px;
  }
  atomic-facet::part(value-checkbox-checked) {
    background: #E03100;
  }
  atomic-facet::part(value-checkbox-label) {
    color: #4D514D;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
  }
  atomic-facet::part(clear-button) {
    display: none;
  }
  atomic-timeframe-facet::part(input-label) {
    grid-column: 1 / 3;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #333;

  }
  atomic-timeframe-facet::part(input-start),
  atomic-timeframe-facet::part(input-end) {
    grid-column: 1 / 3;
    color: #4d514d;
    background: #fff;
    text-transform: uppercase;
    border: 1px solid #949494;
    border-radius: 4px;
    min-width: 90%;
  }
  atomic-timeframe-facet::part(input-start):focus, 
  atomic-timeframe-facet::part(input-end):focus {
    outline: 1px solid #4D514D;
    outline-offset: 1px;
  }
  atomic-timeframe-facet::part(input-apply-button) {
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
  @media (max-width: 767px) {
    atomic-facet::part(facet),
    atomic-timeframe-facet::part(facet) {
      background: white;
      border: none;
      border-bottom: 2px solid #f2f2f2;
    }
    
  atomic-facet::part(label-button),
  atomic-timeframe-facet::part(label-button) {
    font-weight: 500;
  }
  }
  @media (min-width: 1200px) {
    atomic-facet::part(label-button),
    atomic-timeframe-facet::part(label-button) {
      font-size: 18px;
    atomic-facet::part(value-checkbox-label) {
      font-size: 18px;
    }
  }
`;

const sortDropdownStyles = `
  atomic-sort-dropdown {
    margin: 0 20px 20px 0;
  }
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

const querySummaryStyles = `
  atomic-query-summary {
    display: flex;
    align-items: center;
    margin-right: 20px;
    flex-shrink: 0;
  }
  atomic-query-summary::part(container) {
    color: #4D514D;
  }
`;

const filterStyles = `
  atomic-breadbox {
    height: 40px;
  }
  atomic-breadbox::part(label) {
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
  atomic-breadbox::part(show-more),
  atomic-breadbox::part(breadcrumb-button) {
    border: none;
    background: #f2f2f2;
    border-radius: 25px;
    color: #4d514d;
    margin-right: 10px;
  }
  atomic-breadbox::part(breadcrumb-clear) {
    color: #d62700;
    height: 14px;
    width: 14px;
  }
  atomic-breadbox::part(breadcrumb-list) {
    flex-wrap: nowrap;
  }
  atomic-breadbox::part(clear),
  atomic-breadbox::part(show-less) {
    color: #4d514d;
    border: none;
  }
  atomic-breadbox::part(clear):focus,
  atomic-breadbox::part(breadcrumb-button):focus,
  atomic-breadbox::part(show-less):focus,
  atomic-breadbox::part(show-more):focus {
    outline: 1px solid #4D514D;
    outline-offset: 1px;
  }
`;

const SearchInterfaceMarkup = (props: SearchInterfaceProps): JSX.Element => {
  const [hydrated, setHydrated] = React.useState(false);
  const [showMobileFacets, setShowMobileFacets] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', reportWindowSize);
  });

  function reportWindowSize() {
    let zoom = Math.round((window?.outerWidth / window.innerWidth) * 100) / 100;

    const userAgent = navigator.userAgent;
    if (userAgent.match(/firefox|fxios/i)) {
      zoom = window.devicePixelRatio;
    }
    console.log(zoom);
    if (zoom && zoom > 1.7) {
      setZoomed(true);
    } else {
      setZoomed(false);
    }
  }

  React.useEffect(() => {
    // This forces a rerender, so the data is rendered
    // the second time but not the first
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <></>;
  }

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

  const toggleMobileFacets = (show: boolean) => {
    if (show) {
      window.scroll({ top: 0, behavior: 'smooth' });
    }
    setShowMobileFacets(show);
  };

  const isZoomed = zoomed ? 'isZoomed' : '';
  const mobileFacets = showMobileFacets ? 'facetsMobileShown' : '';

  return (
    <div className={styles.searchInterface}>
      <AtomicSearchInterface
        engine={engine}
        languageAssetsPath="/lang"
        searchHub="searchResults"
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
          <Row className={styles.resultsRow}>
            <Col md={4} xl={3} className={classNames(styles.facetsCol, mobileFacets, isZoomed)}>
              <div className={styles.facetsMobile_top}>
                <style>{facetStyles}</style>
                <h2 className={styles.facetsMobile_header}>{props.filterResultsLabel}</h2>
                <button
                  className={styles.facetsToggleHide}
                  onClick={() => toggleMobileFacets(false)}
                  aria-expanded={showMobileFacets}
                >
                  <span className="sr-only">{props.closeFacetsLabel}</span>
                </button>
              </div>

              <div className={styles.facetsWrapper}>
                {props.facets &&
                  props.facets.map((facet, i) => (
                    <AtomicFacet
                      key={i}
                      field={facet.name.toLowerCase().replaceAll(' ', '')} //same way we are storing in Coveo extension
                      label={facet.displayName}
                      isCollapsed={true}
                      className={styles.facetItem}
                    />
                  ))}
                {props.includeDateRangeFacet && (
                  <AtomicTimeframeFacet
                    field="publisheddate"
                    label="Date Range"
                    isCollapsed={true}
                    withDatePicker={true}
                  />
                )}
              </div>
            </Col>
            <Col md={8} xl={9}>
              <h1 className={styles.resultsPageTitle}>{props.title}</h1>
              <div className={styles.searchBoxContainer}>
                <button
                  className={styles.facetsToggleShow}
                  onClick={() => toggleMobileFacets(!showMobileFacets)}
                  aria-expanded={showMobileFacets}
                >
                  <FacetsIcon />
                  <span className="sr-only">Toggle Facets</span>
                </button>
                <style>{searchboxStyles}</style>
                <AtomicSearchBox clearFilters={false} />
              </div>
              <div className={styles.resultInfo}>
                <style>{querySummaryStyles}</style>
                <AtomicQuerySummary />
                <style>{filterStyles}</style>
                <AtomicBreadbox />
              </div>
              <div className={styles.sortSelect}>
                <style>{sortDropdownStyles}</style>
                <AtomicSortDropdown>
                  <AtomicSortExpression label="Relevance" expression="relevancy" />
                  <AtomicSortExpression label="Newest" expression="publisheddate descending" />
                </AtomicSortDropdown>
                <style>{pagerStyles}</style>
                <AtomicPager numberOfPages={3} />
              </div>
              <style>{resultListStyles}</style>
              <AtomicResultList
                density="compact"
                template={ResultTemplateFunction}
              ></AtomicResultList>
              <div className={styles.botSortSelect}>
                <style>{querySummaryStyles}</style>
                <AtomicQuerySummary />
                <div className={styles.botPager}>
                  <AtomicPager numberOfPages={3} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </AtomicSearchInterface>
    </div>
  );
};

const ResultTemplateFunction = (result: Result) => {
  return (
    <>
      <style>{resultStyles}</style>
      {result.raw.filetype === 'Video' ? (
        <VideoTemplate result={result} />
      ) : result.raw.filetype === 'pdf' ? (
        <PdfTemplate result={result} />
      ) : (
        <DefaultTemplate result={result} />
      )}
    </>
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
          <h2>
            <a href={result.clickUri} target="_blank">
              {result.title}
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

export default function SearchResults(props: SearchInterfaceProps): JSX.Element {
  return SearchInterfaceMarkup(props);
}
