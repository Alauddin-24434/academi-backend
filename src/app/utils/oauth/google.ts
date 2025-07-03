import axios from "axios";
import qs from "querystring";
import config from "../../config";

export const getGoogleAuthURL = () => {
  const queryParams = qs.stringify({
    client_id: config.googleClientId,
    redirect_uri: config.googleRedirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${queryParams}`;
};

export const getGoogleTokens = async (code: string) => {
  const { data } = await axios.post(
    "https://oauth2.googleapis.com/token",
    qs.stringify({
      code,
      client_id: config.googleClientId,
      client_secret: config.googleClientSecret,
      redirect_uri: config.googleRedirectUri,
      grant_type: "authorization_code",
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  return data;
};

export const getGoogleUserInfo = async (access_token: string) => {
  const { data } = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return data;
};
