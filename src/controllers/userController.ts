import { inject, injectable } from "tsyringe";
import { UserService } from "../services/userService";
import { Request, Response } from "express";

@injectable()
export class userControllers {

    constructor(@inject("UserService") private userService: UserService){}

        register = async (req: Request, res: Response): Promise<Response> => {
            
            const response = await this.userService.register(req.body)

            return res.status(201).json(response)
        }

        login = async (req: Request, res: Response): Promise<Response> => {
            const response = await this.userService.login(req.body)

            return res.status(200).json(response)

        }

        getUser = async (req: Request, res: Response): Promise<Response> => {
            const { id } = res.locals.decode

            const response = await this.userService.getUser(id)

            return res.status(200).json(response)
        }
    }