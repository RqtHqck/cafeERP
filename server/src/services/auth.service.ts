import {EmployeeService} from "@services//employee.service";
import logger from "@utils/logger";
import {LoginDto} from "@entities/dto/auth.dto";
import {Transaction} from "sequelize";
import ApiError from "@errors/ApiError";
import {generatePassword, generateSalt, validatePassword} from "@utils/password.utility";
import {TokenService} from "@services/token.service";


export class AuthService {

    private _employeeService: EmployeeService;
    private _tokenService: TokenService;

    constructor() {
        this._employeeService = new EmployeeService();
        this._tokenService = new TokenService();

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


    async logout(): Promise<any> {
        logger.info("AuthService::logout")
    }


    async refresh(): Promise<any> {
        logger.info("AuthService::refresh")
    }



}
