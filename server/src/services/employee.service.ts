import {EmployeeRepository} from "@repositories/employee.repository";
import logger from "@utils/logger";

export class EmployeeService {

    private _employeeRepository: EmployeeRepository;

    constructor() {
        this._employeeRepository = new EmployeeRepository();
    }

}
