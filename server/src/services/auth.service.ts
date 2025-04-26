import {EmployeeService} from "@services//employee.service";
import loggerUtility from "@utils/logger.utility";
import {LoginDto, RegisterDto} from "@entities/dto/auth.dto";
import {Transaction} from "sequelize";

export class AuthService {

    private _employeeService: EmployeeService;

    constructor() {
        this._employeeService = new EmployeeService();
    }


    async register(dto: RegisterDto, options: {transaction: Transaction}): Promise<any> {

        loggerUtility.info("AuthService::register")
    }


    async login(dto: LoginDto, options: {transaction: Transaction}): Promise<any> {
        loggerUtility.info("AuthService::login")
    }


    async logout(): Promise<any> {
        loggerUtility.info("AuthService::logout")
    }


    async refresh(): Promise<any> {
        loggerUtility.info("AuthService::refresh")
    }



}
