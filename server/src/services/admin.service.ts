import {EmployeeRepository} from "@repositories/employee.repository";
import logger from "@utils/logger";
import {CreateEmployeeDto} from "@entities/dto/employee.dto";
import {IEmployee, IRole} from "@entities/interfaces";
import {RoleRepository} from "@repositories/role.repository";
import ApiError from "@errors/ApiError";
import {generatePassword, generateSalt} from "@utils/password.utility";

export class AdminService {

    private _employeeRepository: EmployeeRepository;
    private _roleRepository: RoleRepository;

    constructor() {
        this._employeeRepository = new EmployeeRepository();
        this._roleRepository = new RoleRepository();
    }


    async createEmployeeAdmin() {
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
