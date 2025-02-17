import classNames from 'classnames';
import { ComponentTheme } from 'src/types/generic';
import Col from 'src/ui/Grid/Col';
import Container from 'src/ui/Grid/Container';
import Row from 'src/ui/Grid/Row';
import AgentSearch, { AgentSearchProps } from '../AgentSearch/AgentSearch';
import styles from './interior-hero-banner.module.scss';
// import { GetAgentSearch } from 'components/Helpers/ContentUtil';

export interface InteriorHeroBannerPropsUi {
  title?: JSX.Element | string;
  richTextCopy?: JSX.Element | string;
  image?: JSX.Element;
  link?: JSX.Element | string;
  theme?: ComponentTheme;
  agentSearch?: boolean;
  agentSearchTheme?: ComponentTheme;
  overflowTheme?: ComponentTheme;
  isEditing?: boolean;
  agentSearchProps?: AgentSearchProps;
  imageLocation?: string;
  imageBottom?: boolean;
}

export default function InteriorHeroBanner({
  title,
  richTextCopy,
  image,
  link,
  theme,
  agentSearch = false,
  agentSearchProps,
  agentSearchTheme = ComponentTheme.Light,
  overflowTheme = ComponentTheme.Light,
  isEditing = false,
  imageBottom = false,
}: InteriorHeroBannerPropsUi): JSX.Element {
  const componentTheme =
    theme === ComponentTheme.Dark
      ? styles.dark
      : theme === ComponentTheme.Gray
      ? styles.gray
      : styles.light;
  const hasImage = image?.props.field || image?.props.src ? true : false;
  const themeOverlay = hasImage && !isEditing ? styles.themeOverlay : null; //remove overlay while editing so author can edit image
  const agentSearchPositioning = agentSearch ? styles.agentSearchPositioning : null;
  const agentSearchStyles =
    agentSearchTheme === ComponentTheme.Dark
      ? styles.dark
      : agentSearchTheme === ComponentTheme.Gray
      ? styles.gray
      : null;
  const overflowColor = agentSearch ? styles[`overflow-${overflowTheme}`] : null;
  const imageLocationVariant = imageBottom ? 'bottom' : '';
  const showAgentSearch = agentSearch && agentSearchProps && agentSearchProps.title;

  // Temporary added to mimic agent search
  // const agentSearchPropsDummy = {
  //   title: 'Test',
  //   insuranceOptions: [
  //     {
  //       text: 'Please Select',
  //       value: '',
  //     },
  //     {
  //       text: 'Home',
  //       value: 'home',
  //     },
  //     {
  //       text: 'Business',
  //       value: 'business',
  //     },
  //     {
  //       text: 'Auto',
  //       value: 'auto',
  //     },
  //   ],
  //   onSubmitForm: (event) => {
  //     GetAgentSearch(event);
  //   },
  // };

  const renderAgentSearch = () => {
    if (showAgentSearch) {
      return (
        <div className={classNames(styles.agentSearchWrapper, agentSearchStyles)}>
          <AgentSearch
            title={agentSearchProps.title}
            insuranceOptions={agentSearchProps.insuranceOptions}
            onSubmitForm={agentSearchProps.onSubmitForm}
            className="interiorHeroBannerAgentSearch"
            theme={agentSearchTheme}
            zipErrorText={agentSearchProps.zipErrorText}
            missingZipText={agentSearchProps.missingZipText}
            agentSearchButtonText={agentSearchProps.agentSearchButtonText}
            insuranceTypeLabel={agentSearchProps.insuranceTypeLabel}
            zipCodeLabel={agentSearchProps.zipCodeLabel}
          />
        </div>
      );
    } else return <></>;
  };

  return (
    <div
      className={classNames(
        styles.interiorHeroBanner,
        componentTheme,
        themeOverlay,
        agentSearchPositioning,
        overflowColor,
        isEditing ? 'component pages-interior-hero' : '',
        imageBottom ? styles.imageLocationBottom : ''
      )}
    >
      <Container fluid>
        <Row>
          <Col>
            <Container>
              <Row>
                <Col
                  className={classNames(
                    styles.innerCol,
                    showAgentSearch ? styles.innerColWithSearch : ''
                  )}
                >
                  <div className={styles.contentWrapper}>
                    <div className={classNames(styles.content, isEditing ? 'pages-content' : '')}>
                      <h1 className={classNames(styles.title, isEditing ? 'pages-title' : '')}>
                        {title}
                      </h1>
                      <div className={classNames(styles.richText, 'rich-text')}>{richTextCopy}</div>
                      <div className={styles.buttonWrapper}>{link}</div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            {image && !imageLocationVariant ? (
              <div className={styles.imageWrapper}>{image}</div>
            ) : null}

            <Container>
              {imageBottom ? (
                <Row>
                  <Col size={12} className={styles.variantSearchWrapper}>
                    {renderAgentSearch()}
                  </Col>
                  {image ? (
                    <Col size={12} className={styles.imageBottomWrap}>
                      <div>{image}</div>
                    </Col>
                  ) : (
                    <></>
                  )}
                </Row>
              ) : (
                <></>
              )}
            </Container>
          </Col>
        </Row>
      </Container>
      {!imageLocationVariant ? renderAgentSearch() : <></>}
    </div>
  );
}
