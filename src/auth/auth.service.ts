import { ConflictException, Injectable, UnauthorizedException, } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtOptionsFactory, JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async signUp(username: string, password: string): Promise<void> {

        //hash
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            await this.prisma.user.create({
                data: {
                    username: username,
                    password: hashedPassword,
                }
            });
        } catch (error) {
            if (error.code == 'P2002') {
                throw new ConflictException(`The requested name '${username}' is already registered`);
            }
        }
    }


    async signIn(username: string, password: string): Promise<{ accessTocken: string }> {
        const user = await this.prisma.user.findFirst({
            where: {
                username: username,
            }
        });

        // Do a comparetion of passwords
        if (user && (await bcrypt.compareSync(password, user.password))) {
            const payload: JwtPayload = { username };
            const accessTocken: string = await this.jwtService.sign(payload);
            return { accessTocken };
        } else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    }
}
