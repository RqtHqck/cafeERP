import {EmployeeRepository} from "@repositories/employee.repository";

import {RoleRepository} from "@repositories/role.repository";

export class EmployeeService {

    private _employeeRepository: EmployeeRepository;
    private _roleRepository: RoleRepository;

    constructor() {
        this._employeeRepository = new EmployeeRepository();
        this._roleRepository = new RoleRepository();
    }

    async createEmployee() {

    }
}
