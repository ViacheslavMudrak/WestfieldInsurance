import { Field, ImageField, LinkField, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { repositoryConstants } from 'src/repository/constants';
import { ComponentTheme } from 'src/types/generic';
import AlertBanner, { AlertBannerProps } from 'src/ui/AlertBanner/AlertBanner';
import { v4 } from 'uuid';
import { GetDictionaryPhrase, GetStyle, IsEditing } from '../Helpers/ContentUtil';
import NextImageExtended from 'components/Helpers/NextImageExtended';

interface Fields {
  RichTextCopy: Field<string>;
  Link: LinkField;
  Image: ImageField;
}

type AlertBannerPropsBed = {
  params: { [key: string]: string };
  fields: Fields;
};

const AlertBannerMarkup = (props: AlertBannerPropsBed): JSX.Element => {
  const [cookie, setCookie] = useCookies([repositoryConstants.strings.alertBannerCookie]);
  const [initialLoad, setInitialLoad] = useState(true);
  const closeAlertBannerText = GetDictionaryPhrase('close-alert-banner');

  useEffect(() => {
    setInitialLoad(false);
    if (cookie.alertbanner == undefined) {
      setCookie(repositoryConstants.strings.alertBannerCookie, true, { path: '/' });
    }
    window.dispatchEvent(new Event('resize'));
  }, [initialLoad, setCookie, cookie.alertbanner]);

  const isEditing = IsEditing();

  // this alertbanner is the name of the cookie
  if (!initialLoad && cookie.alertbanner && props.fields) {
    const alertBannerProps: AlertBannerProps = {
      isEditing: isEditing,
      content: <RichText field={props.fields.RichTextCopy} />,
      icon: <NextImageExtended field={props.fields.Image} />,
      link: {
        field: props.fields.Link,
        id: v4(),
      },
      theme: GetStyle(
        props.params && props.params.Styles ? props.params.Styles : '',
        repositoryConstants.styles.componentThemeName,
        repositoryConstants.styles.lightThemeDefault
      ) as ComponentTheme,
      onClose: () => {
        window.dispatchEvent(new Event('resize'));
        setCookie(repositoryConstants.strings.alertBannerCookie, false, { path: '/' });
      },
      closeBannerText: closeAlertBannerText,
    };
    return <AlertBanner {...alertBannerProps} />;
  }

  return <></>;
};

export const Default = (props: AlertBannerPropsBed): JSX.Element => {
  return AlertBannerMarkup(props);
};
