import { injectable } from "tsyringe";
import bcrypt from "bcrypt";
import {
  TLoginReturn,
  TUserLogin,
  TUserRegisterBody,
  TUserReturn,
  userReturnSchema,
} from "../schemas/user.schemas";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";

@injectable()
export class UserService {
  public register = async (body: TUserRegisterBody): Promise<TUserReturn> => {
    const hashPassword = await bcrypt.hash(body.password, 10);
    
    const createUser: TUserRegisterBody = {
      name: body.name,
      email: body.email,
      password: hashPassword,
    };
    
    const data = await prisma.user.create({
      data: createUser,
    });

    return userReturnSchema.parse(data);
  };

  public login = async (body: TUserLogin): Promise<TLoginReturn> => {
    const user = await prisma.user.findFirst({ where: { email: body.email } });

    if (!user) {
      throw new AppError("User not registered", 404);
    }

    const compare = await bcrypt.compare(body.password, user.password);

    if (!compare) {
      throw new AppError("Email and Password doesn't match.", 403);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.EXPIRE_TOKEN,
    });

    return {
      acessToken: token,
      data: userReturnSchema.parse(user),
    };
  };

  public getUser = async (id: number): Promise<TUserReturn> => {
    const user = await prisma.user.findFirst({ where: { id } });

    return userReturnSchema.parse(user);
  };
}
