import { Response } from "express";
import { FlashMessage } from "../middlewares/flash";

export const setFlash = (res: Response, flash: FlashMessage) => {
  res.cookie("flash", JSON.stringify(flash), {
    httpOnly: true,
  });
};
