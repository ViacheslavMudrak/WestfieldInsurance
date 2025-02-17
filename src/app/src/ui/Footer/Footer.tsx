import { Category } from 'src/types/category';
import { FooterContentType } from 'src/types/footer';
import { ComponentTheme } from 'src/types/generic';
import AgentSearch, { AgentSearchProps } from 'src/ui/AgentSearch/AgentSearch';
import Col from '../Grid/Col';
import Container from '../Grid/Container';
import Row from '../Grid/Row';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import FooterContact from './FooterContact';
import FooterLinks from './FooterLinks';
import FooterLocation from './FooterLocation';
import FooterNavigation from './FooterNavigation';
import styles from './footer.module.scss';

export interface FooterPropsUi {
  logo: JSX.Element;
  locationData: JSX.Element[];
  contactData: JSX.Element[];
  socialData: JSX.Element[];
  navigation: Category[];
  links: FooterContentType[];
  legalDisclaimer?: JSX.Element;
  agentSearchProps?: AgentSearchProps;
}

export default function Footer(props: FooterPropsUi): JSX.Element {
  const { logo, locationData, contactData, socialData, navigation, links } = props;
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col>
            <div className={styles.footerLogo}>{logo}</div>
            <div className={styles.top}>
              <div className={styles.innerTop}>
                {locationData.map((location, _index) => (
                  <FooterLocation key={_index} location={location} />
                ))}
                <FooterContact contactItems={contactData} socialItems={socialData} />
              </div>
              <nav role="navigation" className={styles.navigation}>
                {navigation.map((cat) => (
                  <FooterNavigation key={cat.id} category={cat} />
                ))}
              </nav>
            </div>
            <div className={styles.bottom}>
              {props.agentSearchProps && props.agentSearchProps.title ? (
                <AgentSearch
                  title={props.agentSearchProps.title}
                  insuranceOptions={props.agentSearchProps.insuranceOptions}
                  onSubmitForm={props.agentSearchProps.onSubmitForm}
                  className={styles.footerAgentSearch}
                  theme={ComponentTheme.Dark}
                  zipErrorText={props.agentSearchProps.zipErrorText}
                  agentSearchButtonText={props.agentSearchProps.agentSearchButtonText}
                  missingZipText={props.agentSearchProps.missingZipText}
                  insuranceTypeLabel={props.agentSearchProps.insuranceTypeLabel}
                  zipCodeLabel={props.agentSearchProps.zipCodeLabel}
                />
              ) : null}
              <FooterLinks links={links} />
              <div className={styles.legalDisclaimer}>{props.legalDisclaimer}</div>
            </div>
          </Col>
        </Row>
      </Container>
      <ScrollToTop />
    </footer>
  );
}
