import classNames from 'classnames';
import SunLogoDark from 'src/assets/icons/sun-early-light-knockout-logo.svg';
import SunLogo from 'src/assets/icons/sun-logo.svg';
import useIsTablet from 'src/hooks/useIsTablet';
import { ComponentTheme } from 'src/types/generic';
import Col from 'src/ui/Grid/Col';
import Container from 'src/ui/Grid/Container';
import Row from 'src/ui/Grid/Row';
import AgentSearch, { AgentSearchProps } from '../AgentSearch/AgentSearch';
import styles from './hero-banner.module.scss';

export interface HeroBannerPropsUi {
  title?: JSX.Element | string;
  richTextCopy?: JSX.Element | string;
  image?: JSX.Element;
  link?: JSX.Element | string;
  theme?: ComponentTheme;
  overlay?: boolean;
  agentSearch?: boolean;
  agentSearchProps?: AgentSearchProps;
  isEditing?: boolean;
}

export default function HeroBanner({
  title,
  richTextCopy,
  image,
  link,
  theme,
  overlay = false,
  agentSearch = true,
  agentSearchProps,
  isEditing,
}: HeroBannerPropsUi): JSX.Element {
  const componentTheme = theme === ComponentTheme.Dark ? styles.dark : styles.light;
  const agentSearchTheme =
    theme === ComponentTheme.Dark ? ComponentTheme.Light : ComponentTheme.Dark;
  const agentSearchVisible = agentSearch ? styles.agentSearchVisible : null;
  const themeOverlay = overlay ? styles.themeOverlay : null;
  const isTablet = useIsTablet();

  function renderLogo(theme): JSX.Element | null {
    let logo: JSX.Element | null;

    switch (theme) {
      case ComponentTheme.Light:
        logo = <SunLogo />;
        break;
      case ComponentTheme.Dark:
        logo = <SunLogoDark />;
        break;
      default:
        logo = null;
        break;
    }

    return logo;
  }

  return (
    <div
      className={classNames(
        styles.heroBanner,
        componentTheme,
        themeOverlay,
        agentSearchVisible,
        isEditing ? 'component pages-hero-banner' : ''
      )}
    >
      <Container>
        <Row>
          <Col>
            <div className={styles.contentWrapper}>
              <div className={classNames(styles.content, isEditing ? ' pages-content ' : '')}>
                <h1 className={classNames(styles.title, isEditing ? ' pages-title ' : '')}>
                  {title}
                </h1>
                <div className={classNames(styles.richText, 'rich-text')}>{richTextCopy}</div>
                {link}
              </div>
              {agentSearch && agentSearchProps && agentSearchProps.title ? (
                <div className={styles.agentSearchWrapper}>
                  <AgentSearch
                    title={agentSearchProps.title}
                    insuranceOptions={agentSearchProps.insuranceOptions}
                    onSubmitForm={agentSearchProps.onSubmitForm}
                    className="heroBannerAgentSearch"
                    theme={agentSearchTheme}
                    zipErrorText={agentSearchProps.zipErrorText}
                    agentSearchButtonText={agentSearchProps.agentSearchButtonText}
                    missingZipText={agentSearchProps.missingZipText}
                    insuranceTypeLabel={agentSearchProps.insuranceTypeLabel}
                    zipCodeLabel={agentSearchProps.zipCodeLabel}
                  />
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
      {!overlay ? <div className={styles.sunWrapper}>{renderLogo(theme)}</div> : null}
      {isTablet ? (
        <div className={classNames(styles.imageWrapper, isEditing ? ' pages-image ' : '')}>
          {image}
        </div>
      ) : null}
    </div>
  );
}
