import { GetItemId } from 'components/Helpers/ContentUtil';
import { siteResolver } from 'lib/site-resolver';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PDFSiteMapService } from 'src/repository/PDFSiteMapService/pdfSiteMapService';

const pdfSource = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  //get the item ID or path of the PDF folder containing the items we wish to index
  const hostName = req.headers['host']?.split(':')[0] || 'localhost';

  let hostNameWithProtocalAndPort;
  if (hostName === 'localhost') {
    hostNameWithProtocalAndPort = 'http://localhost:3000';
  } else {
    hostNameWithProtocalAndPort =
      req.headers['x-forwarded-proto'] + '://' + hostName + (req.headers['x-forwarded-port'] || '');
  }

  //get the site
  const site = siteResolver.getByHost(hostName);

  //grab the folder item ID for the PDFs for this site
  const folderItemId = GetItemId(site.name, 'PDFFolderItemId');

  //query all children of that folder by the template ID of a PDF media item: {0603F166-35B8-469F-8123-E8D87BEDC171}
  const pdfSiteMapService = new PDFSiteMapService();
  const pdfSiteMaps = await pdfSiteMapService.getPDFSiteMap(folderItemId);

  const pdfLinks = pdfSiteMaps
    .map((item) => {
      const encodedUrl = (item.url || '').replaceAll('&', '&amp;');
      return `<url>
      <loc>${encodedUrl?.toLocaleLowerCase()}</loc>
      <priority>0.5</priority>
      <coveo:metadata>
      <title><![CDATA[${item.title}]]></title>
      <keywords>${item.keywords}</keywords>
      <description><![CDATA[${item.description}]]></description>
      <pdfThumbnail>${hostNameWithProtocalAndPort + '/pdf-icon.png'}</pdfThumbnail>
      </coveo:metadata>
    </url>`;
    })
    .join('');

  res.setHeader('Content-Type', 'text/xml;charset=utf-8');
  return res.send(`
  <urlset xmlns="http://sitemaps.org/schemas/sitemap/0.9" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" 
  xmlns:coveo="https://www.coveo.com/en/company/about-us" encoding="UTF-8">
  ${pdfLinks}
  </urlset>
  `);
};

export default pdfSource;
