import { GetItemId, GetTags } from 'components/Helpers/ContentUtil';
import { siteResolver } from 'lib/site-resolver';
import type { NextApiRequest, NextApiResponse } from 'next';
import { VideoSiteMapService } from 'src/repository/VideoSiteMapService/videoSiteMapService';

const videoSource = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  //get the item ID or path of the Video folder containing the items we wish to index
  const hostName = req.headers['host']?.split(':')[0] || 'localhost';

  //get the site
  const site = siteResolver.getByHost(hostName);

  //grab the folder item ID for the Videos for this site
  const folderItemId = GetItemId(site.name, 'SiteRootItemId');

  let hostNameWithProtocalAndPort;
  if (hostName === 'localhost') {
    hostNameWithProtocalAndPort = 'http://localhost:3000';
  } else {
    hostNameWithProtocalAndPort =
      req.headers['x-forwarded-proto'] + '://' + hostName + (req.headers['x-forwarded-port'] || '');
  }

  //query all children of that folder by the template ID of a Video item
  const videoSiteMapService = new VideoSiteMapService();
  const videoSiteMaps = await videoSiteMapService.getVideoSiteMap(folderItemId);
  const videoLinks = videoSiteMaps
    .filter((_) => !_.excludeFromSearch)
    .map((item) => {
      const encodedUrl = (item.link.value.href || '').replaceAll('&', '&amp;');
      let transcriptLink = '';
      if (item.transcriptLink.value.href) {
        const target =
          item.transcriptLink.value.target === 'download'
            ? 'download'
            : `target="${item.transcriptLink.value.target}"`;

        transcriptLink = `<a href="${item.transcriptLink.value.href?.toLocaleLowerCase()}" ${target}>${
          item.transcriptLink.value.text
        }</a>`;
      }
      return `<url>
      <loc>${encodedUrl}</loc>
      <priority>0.5</priority>
      <coveo:metadata>
      <videoTitle><![CDATA[${item.title}]]></videoTitle>
      <videoCaption><![CDATA[${item.videoCaption}]]></videoCaption>
      <videoTranscript><![CDATA[${item.richTextCopy}]]></videoTranscript>
      <videoDescription><![CDATA[${item.videoDescription}]]></videoDescription>
      <mobileVideoTranscriptLink><![CDATA[
        ${transcriptLink}
      ]]></mobileVideoTranscriptLink>
      <videoThumbnail>${
        item.videoThumbnail
          ? item.videoThumbnail?.toLocaleLowerCase()
          : hostNameWithProtocalAndPort + '/video.png'
      }</videoThumbnail>
      <tags>${GetTags(item.sxaTags)}</tags>
      <fileType>Video</fileType>
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
  ${videoLinks}
  </urlset>
  `);
};

export default videoSource;
