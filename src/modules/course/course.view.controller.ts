import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { setFlash } from "../../utils/flash";
import { CourseService } from "./course.service";

export const CourseViewController = {
  index: catchAsync(async (req: Request, res: Response) => {
    const courses = await CourseService.findAll();

    res.render("pages/index", {
      title: "مدیریت دوره ها",
      courses,
    });
  }),

  create: catchAsync(async (req: Request, res: Response) => {
    await CourseService.create(req.body);

    setFlash(res, {
      type: "success",
      message: "دوره با موفقیت ایجاد شد.",
    });

    res.redirect("/");
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    await CourseService.update(req.params.id, req.body);

    setFlash(res, {
      type: "success",
      message: "دوره با موفقیت ویرایش شد.",
    });

    res.redirect("/");
  }),

  delete: catchAsync(async (req: Request, res: Response) => {
    await CourseService.delete(req.params.id);

    setFlash(res, {
      type: "success",
      message: "دوره حذف شد",
    });

    res.redirect("/");
  }),

  applyDiscountToAll: catchAsync(async (req: Request, res: Response) => {
    const discount = Number(req.body.discount);

    await CourseService.applyGlobalDiscount(discount);

    setFlash(res, {
      type: "success",
      message: "تخفیف با موفقیت اعمال شد",
    });

    res.redirect("/");
  }),
};
