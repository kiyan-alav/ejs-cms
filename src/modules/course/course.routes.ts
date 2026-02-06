import { Router } from "express";
import { CourseViewController } from "./course.view.controller";

const router = Router();

router.get("/", CourseViewController.index);
router.post("/courses", CourseViewController.create);
router.post("/courses/:id/edit", CourseViewController.update);
router.post("/courses/:id/delete", CourseViewController.delete);
router.post("/courses/discount", CourseViewController.applyDiscountToAll);

export default router;
