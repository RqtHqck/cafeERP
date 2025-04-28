import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt, StrategyOptions, VerifiedCallback} from 'passport-jwt';
import logger from '@utils/logger';
import {AuthPayload} from "@entities/interfaces";
import {EmployeeService} from "@services/employee.service";

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
};

const employeeService = new EmployeeService();

passport.use(
    new JwtStrategy(options, async (payloads: any, done: any ) => {
        try {
            logger.info('JwtStrategyMiddleware...');
            logger.info(`Payload: ${payloads}`);

            const employeeCandidate = await employeeService.findOne({
                 email: payloads.email
            });

            if (!employeeCandidate) {
                return done(null, false, { message: 'User not found' });
            }

            if (employeeCandidate.roleId !== payloads.roleId) {
                return done(null, false, { message: 'Access denied' });
            }

            const payload: AuthPayload = {
                employeeId: employeeCandidate.id!,
                email: employeeCandidate.email!,
                roleId: employeeCandidate.roleId!
            }

            return done(null, payload);
        } catch (err) {
            logger.error('Error with Jwt Strategy', err);
            return done(err, false);
        }
    })
)

export default passport;