import { GraphQLRobotsService } from '@sitecore-jss/sitecore-jss-nextjs';
import { siteResolver } from 'lib/site-resolver';
import type { NextApiRequest, NextApiResponse } from 'next';
import config from 'temp/config';

const robotsApi = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // Ensure response is text/html
  res.setHeader('Content-Type', 'text/html;charset=utf-8');

  // Resolve site based on hostname
  const hostName = req.headers['host']?.split(':')[0] || 'localhost';
  const site = siteResolver.getByHost(hostName);

  // create robots graphql service
  const robotsService = new GraphQLRobotsService({
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
    siteName: site.name,
  });

  let robotsResult = await robotsService.fetchRobots();

  // fix for multi-site hostnames
  const apiHostInternal = process.env.SITECORE_API_HOST ?? '';
  const siteHostUrl = 'https://' + hostName;
  robotsResult = robotsResult.replace(apiHostInternal, siteHostUrl);
  // end fix multi-site hostnames

  return res.status(200).send(robotsResult);
};

export default robotsApi;
