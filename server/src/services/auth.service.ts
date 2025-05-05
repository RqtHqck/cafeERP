import logger from "@utils/logger";
import {LoginDto} from "@entities/dto/auth.dto";
import {Transaction} from "sequelize";
import ApiError from "@errors/ApiError";
import {validatePassword} from "@utils/password.utility";
import {TokenService} from "@services/token.service";
import {TokenRepository} from "@repositories/token.repository";
import {EmployeeRepository} from "@repositories/employee.repository";


export class AuthService {

    private _employeeRepository: EmployeeRepository;
    private _tokenService: TokenService;
    private _tokenRepository: TokenRepository;


    constructor() {
        this._employeeRepository = new EmployeeRepository();
        this._tokenService = new TokenService();
        this._tokenRepository = new TokenRepository();
    }


    async login(dto: LoginDto, options?: {transaction: Transaction}): Promise<any> {
        logger.info("AuthService::login")

        const employee = await this._employeeRepository.findOne({where: { email: dto.email }});

        if (!employee) {
            throw ApiError.notFoundError(`Employee with email ${ dto.email } not exists`);
        }

        const validatePasswordResult = await validatePassword(dto.password, employee.passwordHash, employee.hashSalt);
        if (!validatePasswordResult) {
            throw ApiError.badRequestError('Password is incorrect.');
        }

        const tokens = await this._tokenService.generateAndSaveAuthTokens({
            employeeId: employee.id!,
            email: employee.email!,
            roleId: employee.roleId!
        }, options)

        return tokens;
    }


    async logout(refreshToken: string, options?: {transaction: Transaction}): Promise<any> {
        logger.info("AuthService::logout")

        if (!refreshToken) {
            throw ApiError.forbiddenError('RefreshToken not provided')
        }
        await this._tokenRepository.destroy({
            where: { refreshToken },
            transaction: options?.transaction
        });

    }


    async refresh(refreshToken: string, options?: {transaction: Transaction}): Promise<any> {
        logger.info("AuthService::refresh")

        if (!refreshToken) {
            throw ApiError.forbiddenError('RefreshToken not provided')
        }

        const payload = await this._tokenService.verifyToken(refreshToken);
        const existRefresh = await this._tokenRepository.findOne({ where: { refreshToken }});

        if (!existRefresh || !payload) {
            throw ApiError.forbiddenError('RefreshToken not provided or incorrect')
        }

        // Generate tokens = { access, refresh }
        const tokens = await this._tokenService.generateAndSaveAuthTokens({
            employeeId: payload.employeeId!,
            email: payload.email!,
            roleId: payload.roleId!
        }, options)

        return tokens
    }



}
