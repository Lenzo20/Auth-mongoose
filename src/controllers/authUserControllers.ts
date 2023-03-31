import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "../model/User";
import { BadRequestError } from './../helpers/apiError';

type jwtPayload = {
  id: string;
}

class authUserControllers {
  public async authUser(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password)
      throw new BadRequestError("Email or password is invalid");

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

    return res.status(200).json({ users, token })
  }

  // logado
  public async getProfile(req: Request, res: Response) {
    // Aqui ele pega os valores do usuario, quando faz a verificação
    // do token ele retorna o dados do usuario
    return res.json(req.user);
  }
}

export default authUserControllers;
