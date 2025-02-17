import { GetItemId } from 'components/Helpers/ContentUtil';
import { resourceItemLinkResolver } from 'lib/resource-item-link-resolver';

export function getFavIconUrl(siteName) {
  const favIcon = GetItemId(siteName, 'favicon');
  if (favIcon) return '/' + favIcon + '';

  // if we don't have a favicon specified, fallback to the default root
  return '/favicon.ico';
}

export function getCanonicalUrl(siteName, relativeUrl) {
  const canonicalHostName = GetItemId(siteName, 'CanonicalHostName');
  if (canonicalHostName) return (canonicalHostName + (relativeUrl || '')).toLowerCase();

  // if the canonicalName value is empty then fallback to localhost
  return ('localhost' + relativeUrl).toLowerCase();
}

export function getResourceCanonicalUrl(siteName, relativeUrl, lang) {
  const resourceLinkResolver = new resourceItemLinkResolver();

  if (!resourceLinkResolver.isResourceItem(relativeUrl)) {
    return getCanonicalUrl(siteName, relativeUrl);
  }

  const canonicalHostName = GetItemId(siteName, 'CanonicalHostName');
  if (canonicalHostName)
    return (
      canonicalHostName + (resourceLinkResolver.getResourcePath(relativeUrl, lang) || '')
    ).toLowerCase();

  // if the canonicalName value is empty then fallback to localhost
  return ('localhost' + relativeUrl).toLowerCase();
}
