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


    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<IEmployee | null> {
        logger.info("EmployeeService::createEmployee")

        const hashSalt = await generateSalt();
        const passwordHash = await generatePassword(createEmployeeDto.password, hashSalt);

        const employeeObj: IEmployee = {
            firstName: createEmployeeDto.firstName,
            lastName: createEmployeeDto.lastName,
            passwordHash: passwordHash,
            hashSalt: hashSalt,
            email: createEmployeeDto.email,
            roleId: createEmployeeDto.roleId
        }

        return await this._employeeRepository.findOrCreate({
            where: {email: createEmployeeDto.email},
            defaults: employeeObj
        });
    }


    async createEmployeeAdmin(): Promise<undefined> {
        try {
            logger.info("AdminService::createEmployeeAdmin")

            const role = await this._roleRepository.findOne({ where: { name: "admin" } });
            if (!role) {
                throw ApiError.notFoundError("'ADMIN' role not found");
            }

            const admin = await this._employeeRepository.findOne({
                where: {
                    email: process.env.ADMIN_EMAIL as string,
                    roleId: role.id
                }
            });
            if (admin) {
                logger.info("Admin exists");
                return;
            }

            const hashSalt = await generateSalt();
            const passwordHash = await generatePassword(process.env.ADMIN_PASSWORD as string, hashSalt);

            const adminEmployee: IEmployee = {
                firstName:"admin",
                lastName: "admin",
                passwordHash: passwordHash,
                hashSalt: hashSalt,
                email: process.env.ADMIN_EMAIL as string,
                roleId: role.id!
            }

            await this._employeeRepository.findOrCreate({
                where: { email: adminEmployee.email },
                defaults: adminEmployee
            });
            return;
        } catch (err) {
            throw ApiError.databaseError("Error create admin employee", err)
        }
    }
}
