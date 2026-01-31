import express from "express";
import path from "path";
import { setupViewEngine } from "./configs/view";
import { errorHandler } from "./middlewares/errorHandler";
import { viewLocals } from "./middlewares/viewLocals";

export const createApp = () => {
  const app = express();

  // body parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // static files
  app.use(express.static(path.join(process.cwd(), "src", "public")));

  // view engine
  setupViewEngine(app);

  // view locals (global variables for EJS)
  app.use(viewLocals);

  // ! routes

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
