import bcrypt from "bcrypt";
import { Request, Response } from "express";

import { User } from "../model/User";

class userControllers {
  public async find(req: Request, res: Response): Promise<Response<object, Record<string, any>>> {
    const users = await User.find();

    return res.status(200).json(users);
  }

  public async create(req: Request, res: Response): Promise<Response<object, Record<string, any>>> {
    try {
      let { username, email, password } = req.body;

      const erros: Array<object> = [];

      if (!username)
        erros.push({ error: "Username is required" });

      if (!email)
        erros.push({ error: "Email is required" });

      if (!password)
        erros.push({ error: "Password is required" });

      if (!email.includes("@gmail.com"))
        email += "@gmail.com";

      if (password && password.length < 8)
        erros.push({ error: "Password must be at least 8 characters" });

      if (erros.length > 1)
        return res.status(400).json(erros);

      if (await User.findOne({ email }))
        return res.json({ message: "email is already existents" });

      const hashPassword = await bcrypt.hash(password, 10);

      const users = await User.create({
        username,
        email,
        password: hashPassword
      });

      return res.status(201).json(users);
    } catch (err) {
      return res.status(500).json({ error: "erro ao criar users", err })
    }
  }

  public async uptade(req: Request, res: Response): Promise<Response<object, Record<string, any>>> {
    try {
      const { username, email, password } = req.body;
      const { id } = req.params;

      const users = await User.findOne({ _id: id });

      if (!users)
        return res.status(400).json({ error: "User not found" });

      if (username)
        users.username = username;

      if (email)
        users.email = email;

      if (password)
        users.password = password;

      users.save();

      return res.status(200).json({ sucess: "User atualizado com sucesso!" });
    } catch (err) {
      return res.status(500).json({ error: "Error ao atualizar usuario ", err });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;

      if (!await User.findOne({ _id: id }))
        return res.status(400).json({ error: "User not found" });

      await User.deleteOne({ _id: id });

      return res.status(200).json({ sucess: "User deleted" });
    } catch (err) {
      return res.status(500).json({ error: "Error ao deletar usuario", err });
    }
  }
}

export default new userControllers();
