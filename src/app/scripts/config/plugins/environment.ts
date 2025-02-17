import { ConfigPlugin, JssConfig } from '..';

/**
 * This plugin will set the "environment" config prop.
 */
class EnvironmentPlugin implements ConfigPlugin {
  order = 200;

  async exec(config: JssConfig) {
    const environment = process.env.ENVIRONMENT;

    return Object.assign({}, config, {
      environment: environment,
    });
  }
}

export const environmentPlugin = new EnvironmentPlugin();
