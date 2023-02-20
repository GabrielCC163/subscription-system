export enum ApplicationEnvEnum {
  LOCAL = 'LOCAL',
  PRODUCTION = 'PRODUCTION',
}

export interface AppConfig {
  node_env: string;
  app_name: string;
  app_env?: ApplicationEnvEnum;
  base_url: string;
  database: {
    user: string;
    password: string;
    name: string;
    host: string;
    port: number;
  };
}

export const getConfig = (): AppConfig => {
  const env = process.env;

  return {
    node_env: env.NODE_ENV,
    app_name: env.APP_NAME,
    app_env: ApplicationEnvEnum[env.APP_ENV] || ApplicationEnvEnum.LOCAL,
    base_url: env.BASE_URL,
    database: {
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      name: env.DB_NAME,
      host: env.DB_HOST,
      port: Number(env.DB_PORT),
    },
  };
};
