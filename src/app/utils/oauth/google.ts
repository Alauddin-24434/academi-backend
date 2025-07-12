// utils/googleToken.ts
import axios from 'axios';
import config from '../../config';




// utils/googleAuth.ts
import querystring from 'querystring';

export const getGoogleAuthURL = (): string => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: config.googleRedirectUri,
    client_id: config.googleClientId,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
  };

  return `${rootUrl}?${querystring.stringify(options)}`;
};








export const getGoogleTokens = async (code: string) => {
  const url = 'https://oauth2.googleapis.com/token';

  const values = {
    code,
    client_id: config.googleClientId,
    client_secret: config.googleClientSecret,
    redirect_uri: config.googleRedirectUri,
    grant_type: 'authorization_code',
  };

  const res = await axios.post(url, values, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return res.data;
};

export const getGoogleUserInfo = async (accessToken: string) => {
  const res = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};
