export interface Course {
  _id: string;
  title: string;
  price: number;
  teacher: string;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseCreateDTO {
  title: string;
  price: number;
  teacher: string;
}

export interface CourseEditDTO {
  title?: string;
  price?: number;
  teacher?: string;
  discount?: number;
}
