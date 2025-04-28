import {EmployeeService} from "@services//employee.service";
import logger from "@utils/logger";
import {LoginDto} from "@entities/dto/auth.dto";
import {Transaction} from "sequelize";
import ApiError from "@errors/ApiError";
import {validatePassword} from "@utils/password.utility";
import {TokenService} from "@services/token.service";
import {TokenRepository} from "@repositories/token.repository";


export class AuthService {

    private _employeeService: EmployeeService;
    private _tokenService: TokenService;
    private _tokenRepository: TokenRepository;


    constructor() {
        this._employeeService = new EmployeeService();
        this._tokenService = new TokenService();
        this._tokenRepository = new TokenRepository();
    }


    async login(dto: LoginDto, options?: {transaction: Transaction}): Promise<any> {
        logger.info("AuthService::login")

        const employee = await this._employeeService.findOne({ email: dto.email });

        if (!employee) {
            throw ApiError.conflictError(`Employee with email ${ dto.email } exists`);
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
        await this._tokenService.removeToken(refreshToken, options);
    }


    async refresh(refreshToken: string, options?: {transaction: Transaction}): Promise<any> {
        logger.info("AuthService::refresh")

        if (!refreshToken) {
            throw ApiError.forbiddenError('RefreshToken not provided')
        }

        const payload = await this._tokenService.verifyToken(refreshToken);
        const existRefresh = await this._tokenRepository.findOne({ refreshToken });
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
