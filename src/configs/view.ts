import { Application } from "express";
import path from "path";

export function setupViewEngine(app: Application) {
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "..", "views"));
}
