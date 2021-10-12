import { Body, Controller, Post } from '@nestjs/common';
import { Auth0Service } from 'src/services/user.service';

@Controller('auth0')
export class Auth0Controller {
  constructor(private auth0Service: Auth0Service) {}

  @Post('/register')
  registerUser(@Body() { email, user_id }: { email: string; user_id: string }) {
    console.log('Yeni kayit', email, user_id);

    return this.auth0Service.appendUser({ email, user_id });
  }
}
