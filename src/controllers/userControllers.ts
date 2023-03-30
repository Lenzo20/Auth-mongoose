import bcrypt from "bcrypt";
import { Request, Response } from "express";

import { User } from "../model/User";
import { BadRequestError, NotFoundError } from './../helpers/apiError';

class userControllers {
  public async find(req: Request, res: Response): Promise<Response<object, Record<string, any>>> {
    const users = await User.find();

    return res.status(200).json(users);
  }

  public async create(req: Request, res: Response): Promise<Response<object, Record<string, any>>> {

    let { username, email, password } = req.body;

    const erros: Array<object> = [];

    if (!username)
      throw new BadRequestError("Username is required");

    if (!email || !email.includes("@"))
      throw new BadRequestError("Email is required");

    if (!password || password.length < 8)
      throw new BadRequestError("Password is invalid");

    if (await User.findOne({ email }))
      throw new NotFoundError("email is already existents");

    const hashPassword = await bcrypt.hash(password, 10);

    const users = await User.create({
      username,
      email,
      password: hashPassword
    });

    return res.status(201).json(users);
  }

  public async uptade(req: Request, res: Response): Promise<Response<object, Record<string, any>>> {

    const { username, email, password } = req.body;
    const { id } = req.params;

    const users = await User.findOne({ _id: id });

    if (!users)
      throw new NotFoundError("User not found");

    if (username)
      users.username = username;

    if (email)
      users.email = email;

    if (password)
      users.password = password;

    users.save();

    return res.status(200).json({ sucess: "User atualizado com sucesso!" });
  }

  public async delete(req: Request, res: Response) {
    const id = req.params.id;

    if (!await User.findOne({ _id: id }))
      throw new NotFoundError("User not found");

    await User.deleteOne({ _id: id });

    return res.status(200).json({ sucess: "User deleted" });

  }
}

export default userControllers;
