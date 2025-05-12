import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt, StrategyOptions, VerifiedCallback} from 'passport-jwt';
import logger from '@utils/logger';
import {IAuthPayload} from "@entities/interfaces";
import {EmployeeRepository} from "@repositories/employee.repository";

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
};

const employeeRepository = new EmployeeRepository();

passport.use(
    new JwtStrategy(options, async (payloads: any, done: any ) => {
        logger.info('JwtStrategyMiddleware...');
        logger.info(`Payload: ${JSON.stringify(payloads)}`);

        try {
            const employeeCandidate = await employeeRepository.findOne({
                where: { email: payloads.email }
            });

            if (!employeeCandidate) {
                return done(null, false, { message: 'User not found' });
            }

            if (employeeCandidate.roleId !== payloads.roleId) {
                return done(null, false, { message: 'Access denied' });
            }

            const payload: IAuthPayload = {
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