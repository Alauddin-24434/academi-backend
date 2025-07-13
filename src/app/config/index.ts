import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;

  accessTokenSecret: string;
  refreshTokenSecret: string;

  accessTokenExpire: string;
  refreshTokenExpire: string;

  googleClientId?: string;
  googleClientSecret?: string;
  googleRedirectUri?: string;

  githubClientId?: string;
  githubClientSecret?: string;
  githubRedirectUri?: string;

  frontendUrl?: string;
}

const config: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  nodeEnv: process.env.NODE_ENV || "development",


  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "defaultAccessSecret",
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "defaultRefreshSecret",

  accessTokenExpire: process.env.ACCESS_TOKEN_EXPIRE || "15m",
  refreshTokenExpire: process.env.REFRESH_TOKEN_EXPIRE || "7d",

  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI,

  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  githubRedirectUri: process.env.GITHUB_REDIRECT_URI,

  frontendUrl: process.env.FRONTEND_URL,
};

export default config;
