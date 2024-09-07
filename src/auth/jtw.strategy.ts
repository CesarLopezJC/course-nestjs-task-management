import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from "./jwt-payload.interface";
import { ConfigService } from '@nestjs/config';

//In this file the PassportStrategy is definded with a secret key and a kind of token in this case It's a bearer token
@Injectable()
//"extends" allows us to access the PassportStrategy function and uses it in our code
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService
    ) {
        //"super" defines the passport strategy
        //It's recomended using an environment variable as a secret 
        super({
            secretOrKey: configService.get('JWT_SECRET'), //todo: Replace the string for an environment variable 
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    // This fucntion is executed to validate the user wich is in the token
    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;

        const user: User = await this.prisma.user.findFirst({
            where: {
                username
            }
        })

        if (!user.id) {
            //When the user is unfounded, with this we avoid the request contionus 
            throw new UnauthorizedException();
        }

        return user;
    }
}