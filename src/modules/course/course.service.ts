import CourseModel from "./course.model";
import { CourseCreateDTO, CourseEditDTO } from "./course.types";

export const CourseService = {
  create(data: CourseCreateDTO) {
    return CourseModel.create(data);
  },

  findAll() {
    return CourseModel.find().sort({ createdAt: -1 });
  },

  findById(id: string) {
    return CourseModel.findById(id);
  },

  update(id: string, data: CourseEditDTO) {
    return CourseModel.findByIdAndUpdate(id, data, { new: true });
  },

  delete(id: string) {
    return CourseModel.findByIdAndDelete(id);
  },

  applyGlobalDiscount(percent: number) {
    return CourseModel.updateMany(
      {
        discount: 0,
      },
      {
        $set: { discount: percent },
      },
    );
  },
};
