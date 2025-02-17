import chalk from 'chalk';
import { ConfigPlugin, JssConfig } from '..';
import {
  CustomSiteInfoService,
  CustomSiteInfo,
} from 'src/repository/CustomSiteInfoService/customsiteinfoservice';

/**
 * This plugin will set the "customsiteinfos" config prop.
 * By default this will attempt to fetch site information directly from Sitecore (using the CustomSiteInfoService).
 */
class CustomSiteInfoPlugin implements ConfigPlugin {
  order = 100;

  async exec(config: JssConfig) {
    let customsiteinfos: CustomSiteInfo[] = [];

    const endpoint = config.graphQLEndpoint;
    const apiKey = config.sitecoreApiKey;

    if (!endpoint || !apiKey) {
      console.warn(
        chalk.yellow('Skipping custom site info fetch (missing GraphQL endpoint or API key).')
      );
    } else {
      console.log(`Fetching custom site info from ${endpoint}`);
      try {
        const customSiteInfoService = new CustomSiteInfoService();
        customsiteinfos = await customSiteInfoService.getCustomSiteInfo(config);
      } catch (error) {
        console.error(chalk.red('Error fetching custom site information'));
        console.error(error);
      }
    }

    return Object.assign({}, config, {
      customsiteinfos: JSON.stringify(customsiteinfos),
    });
  }
}

export const customsiteinfoPlugin = new CustomSiteInfoPlugin();
