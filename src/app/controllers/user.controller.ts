import config from "../config";
import { AppError } from "../error/appError";
import { catchAsync } from "../middlewares/catchAsync";
import { userServices } from "../services/user.services";
import { generateAccessToken, generateRefreshToken, verifyToken, } from "../utils/jwt.utils";

const registrationUser = catchAsync(async (req, res, next) => {
  const payload = req.body;

  const user = await userServices.registerUserIntoDb(payload);

  // Generate refresh token with user id as payload
  const refreshToken = generateRefreshToken({ id: user.id });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
});

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userServices.loginUserFromDb({ email, password });

  // Generate tokens
  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    accessToken,
    data: user,
  });
});

const refreshTokenHandler = catchAsync(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError(401, "Refresh token missing");
  }

  const decoded = verifyToken(refreshToken, config.refreshTokenSecret);

  if (!decoded) {
    throw new AppError(403, "Invalid refresh token");
  }

  const userId = (decoded as any).id;

  const user = await userServices.getUserById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const newAccessToken = generateAccessToken({ id: user.id });
  const newRefreshToken = generateRefreshToken({ id: user.id });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    accessToken: newAccessToken,
  });
});


export { registrationUser, loginUser, refreshTokenHandler };
