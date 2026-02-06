import mongoose, { Document, Schema } from "mongoose";

export interface CourseDocument extends Document {
  title: string;
  price: number;
  teacher: string;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
  finalPrice?: number;
}

const courseSchema = new Schema<CourseDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    teacher: {
      type: String,
      required: true,
      trim: true,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

courseSchema.virtual("finalPrice").get(function () {
  if (!this.discount || this.discount <= 0) {
    return this.price;
  }

  return Math.round(this.price - (this.price * this.discount) / 100);
});

const CourseModel =
  mongoose.models.Course ||
  mongoose.model<CourseDocument>("Course", courseSchema);

export default CourseModel;
