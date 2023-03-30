import dotenv from "dotenv";
import express from "express";

import mongoose from "./database";
import router from "./router/router";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.middlewares();
    this.database();
    this.router();
  }

  private middlewares(): void {
    this.app.use(express.json());
    dotenv.config();
  }

  private database(): void {
    mongoose;
  }

  private router(): void {
    this.app.use(router);
  }
}

export default new App().app;
