import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import { User } from "../model/User";

type jwtPayload = {
  id: string;
}

class authUserControllers {
  public async authUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const erros: Array<object> = []

    if (!email)
      erros.push({ error: "Username is required" });

    if (!password)
      erros.push({ error: "Password is required" });

    if (erros.length > 1)
      return res.status(400).json(erros);

    const users = await User.findOne({ email });

    if (users == null)
      return res.status(400).json({ error: "User not found" });

    if (!await bcrypt.compare(password, users.password))
      return res.status(400).json({ error: "Password incorrect" });

    // created token
    const token: string = jwt.sign({
      id: `${users._id}`,
      name: `${users.username}`,
    },
      process.env.SECRET_KEY ?? " ",
      { expiresIn: "8h" });

    ({
      users: {
        id: `${users._id}`,
        name: `${users.username}`,
        email: `${users.email}`
      },
      token: token
    });

  }

  // logado
  public async getProfile(req: Request, res: Response) {
    return res.json(req.user);
  }
}

export default new authUserControllers();
