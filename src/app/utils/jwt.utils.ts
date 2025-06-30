import jwt from "jsonwebtoken";
import config from "../config";

export const generateAccessToken = (payload: object) => {
    const options: jwt.SignOptions = {};
    if (config.accessTokenExpire) {
        options.expiresIn = config.accessTokenExpire as jwt.SignOptions["expiresIn"];
    }

    return jwt.sign(payload, config.accessTokenSecret, options)
};


export const generateRefreshToken = (payload: object) => {
    const options: jwt.SignOptions = {};
    if (config.refreshTokenExpire) {
        options.expiresIn = config.refreshTokenExpire as jwt.SignOptions["expiresIn"

        ]
    }
    return jwt.sign(payload, config.refreshTokenSecret, options)
}


export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null; 
  }
};
