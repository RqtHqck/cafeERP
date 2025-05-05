import {Router} from "express";
import {ProductService} from "@services/product.service";
import {ProductController} from "@controllers/product.controller";
import {roleAccessMiddleware} from "@middlewares/availability/roleAccess.middleware";
import {validateBodyDto} from "@middlewares/validation/validateDto.middleware";
import {AddProductDto} from "@entities/dto/product.dto";
import {RoleEnum} from "@entities/enums";
import passport from "@middlewares/passport.middleware";

const productService = new ProductService();
const productController = new ProductController(productService);

const productRoutes = Router();

// POST /products/
productRoutes.post('/',
    passport.authenticate("jwt", { session: false }),
    roleAccessMiddleware([RoleEnum.ADMIN, RoleEnum.MANAGER]),
    validateBodyDto(AddProductDto),
    productController.addProduct.bind(productController)
);

// GET /products/:id
productRoutes.get('/:id',
    passport.authenticate("jwt", { session: false }),
    productController.getProductByPk.bind(productController)
);

// GET /products/:id/items
productRoutes.get('/:id/items',
    passport.authenticate("jwt", { session: false }),
    productController.getProductItems.bind(productController)
);

// GET /products/
productRoutes.get('/',
    passport.authenticate("jwt", { session: false }),
    productController.getAllProducts.bind(productController)
);

export default productRoutes;

