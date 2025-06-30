import dotenv from "dotenv";

dotenv.config(); // .env থেকে ভেরিয়েবল লোড করবে

interface Config {
  port: number;
  nodeEnv: string;

  accessTokenSecret: string;
  refreshTokenSecret: string;

  accessTokenExpire: string;
  refreshTokenExpire: string;
}

const config: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  nodeEnv: process.env.NODE_ENV || "development",

  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "defaultAccessSecret",
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "defaultRefreshSecret",

  accessTokenExpire: process.env.ACCESS_TOKEN_EXPIRE || "15m",
  refreshTokenExpire: process.env.REFRESH_TOKEN_EXPIRE || "7d",
};

export default config;
