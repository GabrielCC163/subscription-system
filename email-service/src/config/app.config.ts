export enum ApplicationEnvEnum {
  LOCAL = 'LOCAL',
  PRODUCTION = 'PRODUCTION',
}

export interface AppConfig {
  node_env: string;
  app_env?: ApplicationEnvEnum;
  base_url: string;
  api_shared_secret: string;
  kafka_brokers: string;
}

export const getConfig = (): AppConfig => {
  const env = process.env;

  return {
    node_env: env.NODE_ENV,
    app_env: ApplicationEnvEnum[env.APP_ENV] || ApplicationEnvEnum.LOCAL,
    base_url: env.BASE_URL,
    api_shared_secret: env.API_SHARED_SECRET,
    kafka_brokers: env.KAFKA_BROKERS
  };
};
