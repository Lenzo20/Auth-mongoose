import mongoose from "./database";
import router from "./router/router";
import dotenv from "dotenv";
import express from "express";
import "express-async-errors";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();

    this.middlewares();
    this.database();
    this.router();
  }

  private middlewares(): void {
    this.express.use(express.json());
    dotenv.config();
  }

  private database(): void {
    mongoose;
  }

  private router(): void {
    this.express.use(router);
  }
}

export default new App().express;
