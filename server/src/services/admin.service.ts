import {EmployeeRepository} from "@repositories/employee.repository";
import loggerUtility from "@utils/logger.utility";
import {CreateEmployeeDto} from "@entities/dto/employee.dto";
import {IEmployee, IRole} from "@entities/interfaces";
import {RoleRepository} from "@repositories/role.repository";
import ApiError from "@errors/ApiError";
import {GeneratePassword, GenerateSalt} from "@utils/password.utility";

export class AdminService {

    private _employeeRepository: EmployeeRepository;
    private _roleRepository: RoleRepository;

    constructor() {
        this._employeeRepository = new EmployeeRepository();
        this._roleRepository = new RoleRepository();
    }


    async createEmployeeAdmin() {
        loggerUtility.info("TasksService::createEmployeeAdmin")

        const role = await this._roleRepository.findOne({ name: "admin" });
        if (!role) {
            throw ApiError.notFoundError("'ADMIN' role not found");
        }

        const admin = await this._employeeRepository.findOne({ roleId: role.id });
        if (admin) {
            throw ApiError.conflictError("Admin is exists");
        }

        const hashSalt = await GenerateSalt();
        const passwordHash = await GeneratePassword(process.env.ADMIN_PASSWORD as string, hashSalt);

        const adminEmployee: IEmployee = {
            firstName:"admin",
            lastName: "admin",
            passwordHash: passwordHash,
            hashSalt: hashSalt,
            email: "admin@gmail.com",
            roleId: role.id!
        }

        return await this._employeeRepository.create(adminEmployee, {});
    }

    async createEmployee(createEmployeeDto: CreateEmployeeDto) {
        loggerUtility.info("TasksService::createEmployee")

        const role = await this._roleRepository.findOne({ name: createEmployeeDto.roleName });
        if (!role) {
            throw ApiError.notFoundError(`Role '${createEmployeeDto.roleName}' not found`);
        }

        const hashSalt = await GenerateSalt();
        const passwordHash = await GeneratePassword(createEmployeeDto.password, hashSalt);


        const employeeObj: IEmployee = {
            firstName: createEmployeeDto.firstName,
            lastName: createEmployeeDto.lastName,
            passwordHash: passwordHash,
            hashSalt: hashSalt,
            email: createEmployeeDto.email,
            roleId: role.id!
        }
        return await this._employeeRepository.create(employeeObj, {});

    }

}
