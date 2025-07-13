import { Request, Response } from "express";
import { AppError } from "../error/appError";
import { catchAsync } from "../middlewares/catchAsync";
import { userServices } from "../services/user.services";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwt.utils";
import config from "../config";
import { getGoogleAuthURL, getGoogleTokens, getGoogleUserInfo } from "../utils/oauth/google";
import { OAuthProvider } from "../interfaces/user.interfaces";
import { getGithubAuthURL, getGithubTokens, getGithubUserInfo } from "../utils/oauth/github";

// =========================
// ✅ Custom Registration
// =========================
export const registrationUser = catchAsync(async (req: Request, res: Response) => {
  const payload = {...req.body, method:"CUSTOM"}

  const user = await userServices.registerUserIntoDb(payload);

  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      accessToken,
      user,
    },
  });
});

// =========================
// ✅ Custom Login
// =========================
export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userServices.loginUserFromDb({ email, password });

  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken,
      user,
    },
  });
});

// =========================
// ✅ Refresh Access Token
// =========================
export const refreshTokenHandler = catchAsync(async (req: Request, res: Response) => {
  const tokenFromCookie = req.cookies.refreshToken;

  if (!tokenFromCookie) {
    throw new AppError(401, "Refresh token missing");
  }

  const decoded = verifyToken(tokenFromCookie, config.refreshTokenSecret);

  if (!decoded) {
    throw new AppError(403, "Invalid refresh token");
  }

  const user = await userServices.getUserById((decoded as any).id);
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const newAccessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const newRefreshToken = generateRefreshToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    data: {
      accessToken: newAccessToken,
    },
  });
});

// =========================
// ✅ Google OAuth Redirect
// =========================
export const googleLoginRedirect = catchAsync(async (req, res) => {
  res.redirect(getGoogleAuthURL());
});

// =========================
// ✅ Google OAuth Callback
// =========================
export const googleCallback = catchAsync(async (req, res) => {
  const code = req.query.code as string;
  const { access_token } = await getGoogleTokens(code);
  const userInfo = await getGoogleUserInfo(access_token);

  const user = await userServices.findOrCreateOAuthUser(
    {
      email: userInfo.email,
      name: userInfo.name,
      avatar: userInfo.picture,
    },
    OAuthProvider.GOOGLE
  );

  if (user.method !== OAuthProvider.GOOGLE) {
    const message = `User already registered with different auth method: ${user.method.toLowerCase()}`;
    const encodedMessage = encodeURIComponent(message);
    return res.redirect(`http://localhost:3000/oauth/error?status=400&message=${encodedMessage}`);
  }

  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.redirect(`http://localhost:3000/oauth/success?token=${accessToken}`);
});

// =========================
// ✅ GitHub OAuth Redirect
// =========================
export const githubLoginRedirect = catchAsync(async (req, res) => {
  res.redirect(getGithubAuthURL());
});

// =========================
// ✅ GitHub OAuth Callback
// =========================
export const githubCallback = catchAsync(async (req, res) => {
  const code = req.query.code as string;

  const { access_token } = await getGithubTokens(code);
  const userInfo = await getGithubUserInfo(access_token);

  const user = await userServices.findOrCreateOAuthUser(
    {
      email: userInfo.blog,
      name: userInfo.name,
      avatar: userInfo.avatar_url,
    },
    OAuthProvider.GITHUB
  );

  if (user.method !== OAuthProvider.GITHUB) {
    const message = `User already registered with different auth method: ${user.method.toLowerCase()}`;
    const encodedMessage = encodeURIComponent(message);
    return res.redirect(`http://localhost:3000/oauth/error?status=400&message=${encodedMessage}`);
  }

  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.redirect(`http://localhost:3000/oauth/success?token=${accessToken}`);
});
