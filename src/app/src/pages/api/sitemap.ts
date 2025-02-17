import {
  AxiosDataFetcher,
  AxiosResponse,
  GraphQLSitemapXmlService,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import { resourceItemLinkResolver } from 'lib/resource-item-link-resolver';
import { siteResolver } from 'lib/site-resolver';
import type { NextApiRequest, NextApiResponse } from 'next';
import config from 'temp/config';

const ABSOLUTE_URL_REGEXP = '^(?:[a-z]+:)?//';

const sitemapApi = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const {
    query: { id },
  } = req;

  // Resolve site based on hostname
  const hostName = req.headers['host']?.split(':')[0] || 'localhost';
  const site = siteResolver.getByHost(hostName);

  // create sitemap graphql service
  const sitemapXmlService = new GraphQLSitemapXmlService({
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
    siteName: site.name,
  });

  // if url has sitemap-{n}.xml type. The id - can be null if it's sitemap.xml request
  const sitemapPath = await sitemapXmlService.getSitemap(id as string);

  // if sitemap is match otherwise redirect to 404 page
  if (sitemapPath) {
    const isAbsoluteUrl = sitemapPath.match(ABSOLUTE_URL_REGEXP);
    const sitemapUrl = isAbsoluteUrl ? sitemapPath : `${config.sitecoreApiHost}${sitemapPath}`;
    res.setHeader('Content-Type', 'text/xml;charset=utf-8');

    const sitemapString = await new AxiosDataFetcher()
      .get(sitemapUrl, { responseType: 'text' })
      .then((response: AxiosResponse) => {
        return response.data as string;
      });

    // split the rows by line feed/return
    const rows = sitemapString.split(/\r?\n/);
    let sitemapResult = '';

    const resolver = new resourceItemLinkResolver();
    rows.map((row) => {
      if (row.includes('<loc>')) {
        const canonical = row.replace('<loc>', '').replace('</loc>', '');
        const url = new URL(canonical.trim());
        if (resolver.isResourceItem(url.pathname)) {
          const resourcePath = resolver.getResourcePath(url.pathname);
          sitemapResult =
            sitemapResult +
            '    <loc>' +
            url.protocol +
            '//' +
            url.host +
            resourcePath +
            url.search +
            url.hash +
            '</loc>' +
            '\n';
        } else {
          sitemapResult = sitemapResult + row + '\n';
        }
      } else {
        sitemapResult = sitemapResult + row + '\n';
      }
    });

    return res.send(sitemapResult?.toLocaleLowerCase());
  }

  // this approache if user go to /sitemap.xml - under it generate xml page with list of sitemaps
  const sitemaps = await sitemapXmlService.fetchSitemaps();

  if (!sitemaps.length) {
    return res.redirect('/404');
  }

  const SitemapLinks = sitemaps
    .map((item) => {
      const parseUrl = item.split('/');
      const lastSegment = parseUrl[parseUrl.length - 1];
      return `<sitemap>
        <loc>${getPublicUrl()?.toLocaleLowerCase()}/${lastSegment}</loc>
      </sitemap>`;
    })
    .join('');

  res.setHeader('Content-Type', 'text/xml;charset=utf-8');

  return res.send(`
  <sitemapindex xmlns="http://sitemaps.org/schemas/sitemap/0.9" encoding="UTF-8">${SitemapLinks}</sitemapindex>
  `);
};

export default sitemapApi;
