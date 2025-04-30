import {EmployeeRepository} from "@repositories/employee.repository";

import {RoleRepository} from "@repositories/role.repository";
import {CreateEmployeeDto} from "@entities/dto/employee.dto";
import logger from "@utils/logger";
import ApiError from "@errors/ApiError";
import {generatePassword, generateSalt} from "@utils/password.utility";
import {IEmployee} from "@entities/interfaces";

export class EmployeeService {

    private _employeeRepository: EmployeeRepository;
    private _roleRepository: RoleRepository;

    constructor() {
        this._employeeRepository = new EmployeeRepository();
        this._roleRepository = new RoleRepository();
    }


    async createEmployee(createEmployeeDto: CreateEmployeeDto) {
        logger.info("EmployeeService::createEmployee")

        const role = await this._roleRepository.findOne({ where: { name: createEmployeeDto.roleName } });
        if (!role) {
            throw ApiError.notFoundError(`Role '${createEmployeeDto.roleName}' not found`);
        }

        const hashSalt = await generateSalt();
        const passwordHash = await generatePassword(createEmployeeDto.password, hashSalt);

        const employeeObj: IEmployee = {
            firstName: createEmployeeDto.firstName,
            lastName: createEmployeeDto.lastName,
            passwordHash: passwordHash,
            hashSalt: hashSalt,
            email: createEmployeeDto.email,
            roleId: role.id!
        }

        return await this._employeeRepository.findOrCreate({
            where: {email: createEmployeeDto.email},
            defaults: employeeObj
        });
    }
}
