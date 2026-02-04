import { NextFunction, Request, Response } from "express";

export type FlashType = "success" | "error" | "info" | "warning";

export interface FlashMessage {
  type: FlashType;
  message: string;
}

export const flashMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const flash = req.cookies?.flash;

  if (flash) {
    try {
      res.locals.flash = JSON.parse(flash);
      res.clearCookie("flash");
    } catch {
      res.clearCookie("flash");
    }
  }

  next();
};
