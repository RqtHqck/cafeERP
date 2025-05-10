import logger from "@utils/logger";
import {RoleEnum} from "@entities/enums";
import {RoleRepository} from "@repositories/role.repository";
import {IRole} from "@entities/interfaces";

export class RoleService {

    private _roleRepository: RoleRepository;

    constructor() {
        this._roleRepository = new RoleRepository();
    }


    async createMany(): Promise<void> {
        logger.info("RoleService::createMany")
        const allowedRoleNames = [...Object.values(RoleEnum)]
        // Create roles by enum
        let roles: IRole[] = allowedRoleNames.map((name: RoleEnum): IRole => ({ name }));
        await this._roleRepository.createMany(roles);
    }


    async findRoleByName(name: RoleEnum): Promise<IRole | null> {
        logger.info(`RoleService::findOneByName name: ${name}`);

        return await this._roleRepository.findOne({ where: { name } });
    }


    async findRoleByPk(id: number): Promise<IRole> {
        logger.info(`RoleService::findRoleByPk id: ${id}`);

        return await this._roleRepository.findByPk(id);
    }
}