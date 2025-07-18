import dotenv from "dotenv";

// Load .env file depending on environment
dotenv.config();
interface EnvVariable {
    PORT?: string;
    JWT_ACCESS_TOKEN_SECRET: string;
    JWT_REFRESH_TOKEN_SECRET: string;
    JWT_ACCESS_TOKEN_EXPIRATION: string;
    JWT_REFRESH_TOKEN_EXPIRATION: string;
    NODE_ENV?: string;
    CLIENT_URL?: string;
}

export const envVariable: EnvVariable = {
    PORT: process.env.PORT,
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET!,
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET!,
    JWT_ACCESS_TOKEN_EXPIRATION: (process.env.JWT_ACCESS_TOKEN_EXPIRATION || "15m") as `${number}${'s' | 'm' | 'h' | 'd'}`,
    JWT_REFRESH_TOKEN_EXPIRATION: (process.env.JWT_REFRESH_TOKEN_EXPIRATION || "7d") as `${number}${'s' | 'm' | 'h' | 'd'}`,



    NODE_ENV: process.env.NODE_ENV,
    CLIENT_URL: process.env.CLIENT_URL,
};
