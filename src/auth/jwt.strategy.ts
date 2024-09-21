import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'yourSecretKey', // Should be in environment variables in production
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}
