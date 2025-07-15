import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../middlewares/catchAsync";


const overview = catchAsync(catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  
   
    res.status(200).json({ success: true, message: "" });
}))