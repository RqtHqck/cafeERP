import {EmployeeService} from "@services//employee.service";
import logger from "@utils/logger";
import {LoginDto, RegisterDto} from "@entities/dto/auth.dto";
import {Transaction} from "sequelize";

export class AuthService {

    private _employeeService: EmployeeService;

    constructor() {
        this._employeeService = new EmployeeService();
    }


    async register(dto: RegisterDto, options: {transaction: Transaction}): Promise<any> {

        logger.info("AuthService::register")
    }


    async login(dto: LoginDto, options: {transaction: Transaction}): Promise<any> {
        logger.info("AuthService::login")
    }


    async logout(): Promise<any> {
        logger.info("AuthService::logout")
    }


    async refresh(): Promise<any> {
        logger.info("AuthService::refresh")
    }

}
