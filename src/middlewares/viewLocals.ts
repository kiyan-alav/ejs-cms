import { NextFunction, Request, Response } from "express";

export interface ViewLocals {
  BASE_URL: string;
  currentPath: string;
  year: number;
}

export const viewLocals = (
  req: Request,
  res: Response<any, ViewLocals>,
  next: NextFunction,
) => {
  res.locals.BASE_URL = process.env.BASE_URL || "";
  res.locals.currentPath = req.path;
  res.locals.year = new Date().getFullYear();

  next();
};
