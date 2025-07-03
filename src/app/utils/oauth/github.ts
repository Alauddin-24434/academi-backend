import axios from "axios";
import config from "../../config";

export const getGithubAuthURL = () => {
  return `https://github.com/login/oauth/authorize?client_id=${config.githubClientId}&redirect_uri=${config.githubRedirectUri}`;
};

export const getGithubTokens = async (code: string) => {
  const res = await axios.post(
    `https://github.com/login/oauth/access_token`,
    {
      client_id: config.githubClientId,
      client_secret: config.githubClientSecret,
      code,
      redirect_uri: config.githubRedirectUri,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return res.data;
};

export const getGithubUserInfo = async (access_token: string) => {
  const { data } = await axios.get("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return data;
};
