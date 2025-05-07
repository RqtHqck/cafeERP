import { Router } from 'express';
import {AuthController} from "@controllers/auth.controller";
import {validateBodyDto} from "@middlewares/validation/validateDto.middleware";
import {LoginDto} from "@entities/dto/auth.dto";
import {AuthService} from "@services/auth.service";
import passport from "@middlewares/passport.middleware";
const authRoutes = Router();


const authService = new AuthService();
const authController = new AuthController(authService);

// POST /auth/login
authRoutes.post('/login',
    validateBodyDto(LoginDto),
    authController.login.bind(authController)
);


// GET /auth/logout
authRoutes.get('/logout',
    passport.authenticate("jwt", { session: false }),
    authController.logout.bind(authController)
);


// GET /auth/refresh
authRoutes.get('/refresh',
    authController.refresh.bind(authController)
);


export default authRoutes;
