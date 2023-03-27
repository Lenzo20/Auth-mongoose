import { Request, Response, NextFunction } from "express";
import { User } from "../model/User";

import jwt from "jsonwebtoken";

type jwtPayload = {
  id: string;
}

//  Autenticaçãoo do token
export const authMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      return res.status(401).json({ error: "User not autorizado" });

    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(token, process.env.SECRET_KEY ?? " ") as jwtPayload;

    const users = await User.findOne({ _id: id });

    if (users == null)
      return res.status(401).json({ error: "User not autorizado" });

    req.user = {
      id: `${users._id}`,
      name: `${users.username}`,
      email: `${users.email}`
    };

    return next();
  } catch (err) {
    return res.sendStatus(500);
  }
}
