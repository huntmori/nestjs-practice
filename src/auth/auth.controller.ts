import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }
}
