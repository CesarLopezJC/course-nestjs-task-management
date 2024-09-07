import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('/singup')
    async singUp(@Body() authCredecials: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredecials;
        return this.authService.signUp(username, password);
    }

    @Post('/singin')
    async singIn(@Body() authCredecials: AuthCredentialsDto): Promise<{ accessTocken: string }> {
        const { username, password } = authCredecials;
        return this.authService.signIn(username, password);
    }
}
