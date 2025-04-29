import jwt, {JwtPayload} from 'jsonwebtoken';
import ApiError from "@errors/ApiError";
import {Transaction} from "sequelize";
import {AuthPayload, IToken} from "@entities/interfaces";
import {TokenRepository} from "@repositories/token.repository";
import logger from "@utils/logger";


export class TokenService {
    private _tokenRepository: TokenRepository;

    constructor() {
        this._tokenRepository = new TokenRepository();
    }

    async generateToken(payload: object, expiresIn:  number) {
        logger.info("TokenService::generateToken");

        const options: jwt.SignOptions = { expiresIn };
        return jwt.sign(
            payload,
            process.env.JWT_SECRET as string,
            options
        );
    }


    async verifyToken(token: string): Promise<AuthPayload> {
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        } catch (err) {
            throw ApiError.tokenError(`Error when trying to decode token: ${token}`, err);
        }
        const payload: AuthPayload = {
            employeeId: decoded.employeeId,
            email: decoded.email,
            roleId: decoded.roleId,
        }
        return payload
    }
    

    async generateAndSaveAuthTokens(payload: AuthPayload, options?: {transaction: Transaction}): Promise<{ accessToken: string, refreshToken: string }>  {
        const accessToken = await this.generateToken(payload, parseInt(process.env.JWT_EXPIRESIN_ACCESS as string, 10));
        const refreshToken = await this.generateToken(payload, parseInt(process.env.JWT_EXPIRESIN_REFRESH as string, 10));
        await this.saveToken(payload.employeeId, refreshToken, options);
        return { accessToken, refreshToken };
    }


    async saveToken(employeeId: number, refreshToken: string, options?: {transaction: Transaction}): Promise<void>  {
        logger.info("TokenService::saveToken")

        const employeeToken = await this._tokenRepository.findOne({ employeeId })

        if (!employeeToken) {
            await this._tokenRepository.create({
                employeeId,
                refreshToken
            }, options)
        } else {
            employeeToken.refreshToken = refreshToken

            await this._tokenRepository.update(
                {
                    employeeId,
                    refreshToken
                },
                { where: { employeeId } },
                options
            )
        }
        return;
    }
}