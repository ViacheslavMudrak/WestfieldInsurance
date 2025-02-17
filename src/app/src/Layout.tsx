/**
 * This Layout is needed for Starter Kit.
 * TS: made changes to this to follow the FED starter kit. Review the LayoutSitecore.tsx
 * for the OOTB sitecore starter kit Layout file
 */
import {
  Field,
  HTMLLink,
  ImageField,
  LayoutServiceData,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
//import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import { GetTags } from 'components/Helpers/ContentUtil';
import Head from 'next/head';
import React from 'react';
import Scripts from 'src/Scripts';
import { getCanonicalUrl, getFavIconUrl } from './LayoutUtils';
import { Tag } from './repository/shared/types';
import LayoutStatic from './ui/Layout/LayoutStatic';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
//const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
  children?: React.ReactNode;
}

//TS: wasn't using below after making changes with the FED starter kit
interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
  NoIndex?: Field<boolean>;
  NoFollow?: Field<boolean>;
  ExcludeFromSearch?: Field<boolean>;
  AdditionalMetaData?: Field<string>;
  SxaTags?: Tag[];
  ThumbnailImage?: ImageField;
  Schema?: Field;
  MetaDescription?: Field<string>;
  OgTitle?: Field<string>;
  OgDescription?: Field<string>;
  OgImage?: ImageField;
  AdditionalOgData?: Field<string>;
  BreadcrumbTitle?: Field<string>;
}

const Layout = ({ layoutData, headLinks, children }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';
  const itemPath = layoutData.sitecore.context.itemPath;
  const siteName = layoutData.sitecore.context.site?.name;

  return (
    <>
      <Scripts />
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Page'}</title>
        {fields?.MetaDescription?.value && (
          <meta name="description" content={fields?.MetaDescription?.value} />
        )}
        {fields?.OgTitle?.value && <meta property="og:title" content={fields?.OgTitle?.value} />}
        {fields?.OgDescription?.value && (
          <meta property="og:description" content={fields?.OgDescription?.value} />
        )}
        {fields?.BreadcrumbTitle?.value && (
          <meta name="BreadcrumbTitle" content={fields?.BreadcrumbTitle?.value} />
        )}
        {fields?.OgImage?.value?.src && (
          <meta property="og:image" content={fields?.OgImage?.value?.src?.toString()} />
        )}
        <meta property="og:url" content={getCanonicalUrl(siteName, itemPath)} />
        {(() => {
          if (fields.AdditionalOgData && fields.AdditionalOgData.value !== '') {
            const records = new URLSearchParams(fields.AdditionalOgData.value);
            const renderList = () => {
              const listItems: JSX.Element[] = [];
              for (const [key, value] of records.entries()) {
                listItems.push(<meta property={key} content={value} />);
              }
              return listItems;
            };
            return <>{renderList()}</>;
          }
          return <></>;
        })()}
        {fields.Schema?.value && fields.Schema?.value?.toString() != '' && (
          <script type="application/ld+json">{fields.Schema?.value?.toString()}</script>
        )}
        <link rel="canonical" href={getCanonicalUrl(siteName, itemPath)} />
        <meta name="ExcludeFromSearch" content={fields?.ExcludeFromSearch?.value?.toString()} />
        {/* Coveo needed meta tags */}
        {fields?.ThumbnailImage?.value?.src && (
          <meta name="SearchThumbnail" content={fields?.ThumbnailImage?.value?.src?.toString()} />
        )}
        {fields?.SxaTags?.length && <meta name="Tags" content={GetTags(fields?.SxaTags)} />}
        {(() => {
          if (fields.AdditionalMetaData && fields.AdditionalMetaData.value !== '') {
            const records = new URLSearchParams(fields.AdditionalMetaData.value);
            const renderList = () => {
              const listItems: JSX.Element[] = [];
              for (const [key, value] of records.entries()) {
                listItems.push(<meta key={key} name={key} content={value} />);
              }
              return listItems;
            };
            return <>{renderList()}</>;
          }
          return <></>;
        })()}
        {(() => {
          if (fields?.NoIndex?.value && fields?.NoFollow?.value)
            return <meta name="robots" content="noindex,nofollow" />;
          if (fields?.NoIndex?.value) return <meta name="robots" content="noindex" />;
          if (fields?.NoFollow?.value) return <meta name="robots" content="nofollow" />;
          return <></>;
        })()}
        <link rel="icon" href={getFavIconUrl(siteName)} />
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
      </Head>
      <LayoutStatic
        header={route && <Placeholder name="headless-header" rendering={route} />}
        footer={route && <Placeholder name="headless-footer" rendering={route} />}
        className={mainClassPageEditing}
      >
        {route ? (
          <>
            <Placeholder name="headless-main" rendering={route} />
          </>
        ) : (
          children
        )}
      </LayoutStatic>
    </>
  );
};

export default Layout;
