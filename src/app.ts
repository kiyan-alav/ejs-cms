import cookieParser from "cookie-parser";
import express from "express";
import path from "path";
import { setupViewEngine } from "./configs/view";
import { errorHandler } from "./middlewares/errorHandler";
import { flashMiddleware } from "./middlewares/flash";
import { viewLocals } from "./middlewares/viewLocals";
import courseRoutes from "./modules/course/course.routes";

export const createApp = () => {
  const app = express();

  // body parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // cookie parser
  app.use(cookieParser());
  app.use(flashMiddleware);

  // static files
  app.use(express.static(path.join(__dirname, "..", "public")));

  // view engine
  setupViewEngine(app);

  // view locals (global variables for EJS)
  app.use(viewLocals);

  app.use("/", courseRoutes);

  // ! routes
  app.get("/", (req, res) => {
    res.render("pages/index", {
      title: "EJS - CMS",
    });
  });

  // 404 page
  app.use((req, res) => {
    res.status(404).render("errors/404", {
      title: "Page Not Found",
    });
  });

  // global error handler
  app.use(errorHandler);

  return app;
};
