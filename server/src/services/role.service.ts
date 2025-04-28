import logger from "@utils/logger";
import {RoleEnum} from "@entities/enums";
import {RoleRepository} from "@repositories/role.repository";
import {IRole} from "@entities/interfaces";

export class RoleService {

    private _roleRepository: RoleRepository;

    constructor() {
        this._roleRepository = new RoleRepository();
    }


    async findOne(filter: any) {
        logger.info("RoleService::findOne")
        return await this._roleRepository.findOne(filter);
    }


    async createMany() {
        logger.info("RoleService::createMany")
        const allowedRoleNames = [...Object.values(RoleEnum)]
        // Create roles by enum
        let roles: IRole[] = allowedRoleNames.map((name: RoleEnum): IRole => ({ name }));
        await this._roleRepository.createMany(roles);
    }
}