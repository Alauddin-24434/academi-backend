import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { getDashboardOverview } from "./dashboard.service";
import { IUser } from "../User/user.interfcae";

export const dashboardOverview = catchAsync(async (req: Request, res: Response) => {
  const user = req.user; // Assumes { id, role } available in decoded token
  const stats = await getDashboardOverview(user as IUser);
  res.status(200).json({
    success: true,
    message: `Dashboard fetched successfully`,
    data: stats,
  });
});
