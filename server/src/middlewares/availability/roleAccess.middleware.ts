import {NextFunction, Request, Response} from 'express'
import {IAuthPayload} from "@entities/interfaces";
import {RoleRepository} from "@repositories/role.repository";
import ApiError from "@errors/ApiError";
import {RoleEnum} from "@entities/enums";
import logger from "@utils/logger";


export const roleAccessMiddleware = (allowedRoles: RoleEnum[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info('roleAccessMiddleware...')
            logger.info(`allowedRoles: [${Object.values(allowedRoles)}]`)
            const userPayload = req.user as IAuthPayload;
            const roleRepository = new RoleRepository();

            const role = await roleRepository.findOne({ where: { id: userPayload.roleId } })

            if (!role) {
                throw ApiError.badRequestError(`Role with id ${userPayload.roleId} not found`);
            }
            if (allowedRoles.includes(role.name as RoleEnum)) {
                return next();
            }

            throw ApiError.forbiddenError(`Access denied for ${role.name}`);
        } catch (err) {
            next(err)
        }
    }
}