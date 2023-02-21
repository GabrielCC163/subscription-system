export enum ApplicationEnvEnum {
  LOCAL = 'LOCAL',
  PRODUCTION = 'PRODUCTION',
}

export interface AppConfig {
  node_env: string;
  app_name: string;
  app_env?: ApplicationEnvEnum;
  base_url: string;
  subscription_service: {
    host: string;
    secret_key: string;
  }
}

export const getConfig = (): AppConfig => {
  const env = process.env;

  return {
    node_env: env.NODE_ENV,
    app_name: env.APP_NAME,
    app_env: ApplicationEnvEnum[env.APP_ENV] || ApplicationEnvEnum.LOCAL,
    base_url: env.BASE_URL,
    subscription_service: {
      host: env.SUBSCRIPTION_SERVICE_HOST,
      secret_key: env.SUBSCRIPTION_SERVICE_SECRET_KEY
    }
  };
};
