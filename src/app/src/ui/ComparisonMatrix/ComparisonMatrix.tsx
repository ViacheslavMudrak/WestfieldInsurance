import { default as classNames, default as classnames } from 'classnames';
import React, { useEffect, useState } from 'react';
import CheckSVG from 'src/assets/icons/check.svg';
import CloseSVG from 'src/assets/icons/close.svg';
import { ComparisonCategory } from 'src/data/comparisonMatrix';
import Col from 'src/ui/Grid/Col';
import Container from 'src/ui/Grid/Container';
import Row from 'src/ui/Grid/Row';
import styles from './comparison-matrix.module.scss';

export interface ComparisonMatrixProps {
  label?: string | JSX.Element;
  title?: string | JSX.Element;
  data: ComparisonCategory[];
  hideAccentColor?: boolean;
  isEditing?: boolean;
  yesLabel?: string;
  noLabel?: string;
}

export default function ComparixonMatrix({
  label,
  title,
  data,
  hideAccentColor,
  isEditing,
  yesLabel,
  noLabel,
}: ComparisonMatrixProps): JSX.Element {
  const firstCat = data && data[0];
  const catKey = Object.keys(firstCat)[0];
  const catProducts = firstCat[catKey];
  const productTitles = catProducts.map((catProds) => {
    const prodTitle = Object.keys(catProds)[0];
    return prodTitle;
  });
  const activeTitles = productTitles;
  const numCols = activeTitles.length + 1;
  const hideMobileMatrix = catProducts.length > 2 ? styles.hideMatrix : styles.showMobileMatrix;
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

    if (zoom && zoom > 1.7) {
      setZoomed(true);
    } else {
      setZoomed(false);
    }
  }

  return (
    <section
      style={{ '--table-cols': numCols } as React.CSSProperties}
      className={classNames(
        styles.comparisonMatrix,
        hideMobileMatrix,
        zoomed ? styles.zoomed : '',
        isEditing ? 'component' : '',
        isEditing && hideAccentColor ? 'default-comparison-matrix' : 'accent-comparison-matrix'
      )}
    >
      <Container>
        <Row>
          <Col>
            <div className={classNames(styles.label, isEditing ? 'pages-label' : '')}>{label}</div>
            <h2 className={styles.title}>{title}</h2>

            <section
              className={styles.tableWrap}
              tabIndex={0}
              aria-label="Product Comparison Table"
            >
              <table className={styles.matrix} cellPadding={0} cellSpacing={0}>
                {data && (
                  <thead>
                    <tr className={styles.cell}>
                      <td></td>

                      {activeTitles.map((title, _i) => {
                        const accent = _i === 0 && !hideAccentColor ? styles.accent : null;
                        return (
                          <th key={title} scope="col">
                            <span
                              className={classnames(
                                styles.colTitle,
                                accent,
                                isEditing && _i === 0 ? 'pages-comparison-matrix-first-header' : ''
                              )}
                            >
                              {title}
                            </span>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {data &&
                    data.map((d, i) => {
                      const colTitle = Object.keys(d)[0];
                      const colValues = d[colTitle];
                      // const activeCols = isTablet ? colValues : colValues.slice(0, 2);
                      const activeCols = colValues;
                      return (
                        <tr key={i}>
                          <th className={styles.rowTitle} scope="row">
                            {colTitle}
                          </th>
                          {activeCols.map((v, index) => {
                            const rowTitle = Object.keys(v)[0];
                            const rowValue = v[rowTitle];
                            return (
                              <td className={styles.matrixCell} key={index}>
                                {rowValue ? (
                                  <>
                                    <CheckSVG role="img" aria-hidden="true" />
                                    <span className="sr-only">{yesLabel}</span>
                                  </>
                                ) : (
                                  <>
                                    <CloseSVG role="img" aria-hidden="true" />
                                    <span className="sr-only">{noLabel}</span>
                                  </>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </section>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
