import { Request, Response, NextFunction } from 'express';
import {AuthService} from "@services/auth.service";
import {RegisterDto, LoginDto} from "@entities//dto/auth.dto";
import db from "@utils/sequelize.utility";

export class AuthController {
    
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }


    async register(req: Request, res: Response, next: NextFunction): Promise<any> {
        const transaction = await db.sequelize.transaction();

        try {
            const registerDto: RegisterDto = req.body;
            const { accessToken } = await this.authService.register(registerDto, { transaction });
            await transaction.commit();
            return res
                .status(201)
                .json({ accessToken: accessToken });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }


    async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        const transaction = await db.sequelize.transaction();

        try {
            const loginDto: LoginDto = req.body;
            const { accessToken } = await this.authService.login(loginDto, { transaction });
            await transaction.commit();
            return res
                .status(200)
                .json({ accessToken: accessToken });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }


    async logout(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const accessToken = await this.authService.logout();
            return res
                .status(200)
                .json({ accessToken: accessToken });
        } catch (error) {
            next(error);
        }
    }


    async refresh(req: Request, res: Response, next: NextFunction): Promise<any> {

        try {
            const { accessToken } = await this.authService.refresh();
            return res
                .status(200)
                .json({ accessToken: accessToken });
        } catch (error) {
            next(error);
        }
    }


}