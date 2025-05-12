import {Router} from 'express';
import {validateBodyDto} from "@middlewares/validation/validateDto.middleware";
import passport from "@middlewares/passport.middleware";
import {roleAccessMiddleware} from "@middlewares/availability/roleAccess.middleware";
import {ItemService} from "@services/item.service";
import {RoleEnum} from "@entities/enums";
import {AddItemDto, UpdateItemDto} from "@entities/dto/item.dto";
import {validateParamsId} from "@middlewares/validation/validateId.middleware";
import {validateBodyArrayDto} from "@middlewares/validation/validateDtoArray.middleware";
import {ItemController} from "@controllers/item.controller";


const itemService = new ItemService();
const itemController = new ItemController(itemService);

const itemsRoutes = Router();

// POST /items/addOne
itemsRoutes.post('/addOne',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN, RoleEnum.MANAGER]),
    validateBodyDto(AddItemDto),
    itemController.addOneItem.bind(itemController)
);

// POST /items/addMany
itemsRoutes.post('/addMany',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN, RoleEnum.MANAGER]),
    validateBodyArrayDto(AddItemDto),
    itemController.addManyItems.bind(itemController)
);

// PUT /items/:id
itemsRoutes.patch('/:id',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN, RoleEnum.MANAGER]),
    validateParamsId(),
    validateBodyDto(UpdateItemDto),
    itemController.patchUpdateItem.bind(itemController)
);

// GET /items/:id
itemsRoutes.get('/:id',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.CASHIER, RoleEnum.COOK]),
    validateParamsId(),
    itemController.getItemByPk.bind(itemController)
);

// GET /items/
itemsRoutes.get('/',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.CASHIER, RoleEnum.COOK]),
    itemController.getAllItems.bind(itemController)
);


export default itemsRoutes;

