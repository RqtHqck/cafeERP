import { Request, Response, NextFunction } from 'express';
import {AuthService} from "@services/auth.service";
import {LoginDto} from "@entities//dto/auth.dto";
import db from "@utils/sequelize.utility";
import logger from "@utils/logger";

export class AuthController {
    
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }


    async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        logger.info("AuthController::login");
        const transaction = await db.sequelize.transaction();

        try {
            const loginDto = <LoginDto>req.body;
            const { accessToken, refreshToken } = await this.authService.login(loginDto, { transaction });
            await transaction.commit();
            return res
                .status(200)
                .cookie('refreshToken', refreshToken, {
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
                    httpOnly: true,
                    sameSite: 'strict',
                })
                .json({ accessToken: accessToken });
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }


    async logout(req: Request, res: Response, next: NextFunction): Promise<any> {
        logger.info("AuthController::logout");
        const transaction = await db.sequelize.transaction();

        try {
            const { refreshToken } = req.cookies;
            await this.authService.logout(refreshToken, { transaction });
            await transaction.commit();
            return res
                .status(204)
                .cookie('refreshToken', '', { maxAge: 0 })
                .json()
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }


    async refresh(req: Request, res: Response, next: NextFunction): Promise<any> {
        logger.info("AuthController::refresh");
        const transaction = await db.sequelize.transaction();

        try {
            const { refreshToken } = req.cookies;
            const tokens = await this.authService.refresh(refreshToken, { transaction });
            return res
                .status(200)
                .cookie('refreshToken', tokens.refreshToken, {
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
                    httpOnly: true,
                    sameSite: 'strict',
                })
                .json({ accessToken: tokens.accessToken });
        } catch (error) {
            next(error);
        }
    }


}