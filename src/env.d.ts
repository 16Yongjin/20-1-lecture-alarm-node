declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    FCM_API_KEY: string;
    POSTGRES_HOST: string;
    POSTGRES_USERNAME: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DATABASE: string;
    POSTGRES_TEST_DATABASE: string;
    JWT_SECRET: string;
    ADMIN_ID: string;
    ADMIN_PASSWORD: string;
    TELEGRAM_BOT_TOKEN: string;
    TELEGRAM_CHAT_ID: string;
  }
}
