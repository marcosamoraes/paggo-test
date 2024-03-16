import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getServerStatus(): string {
    return this.appService.getServerStatus();
  }

  @Get('users')
  async getUsers(): Promise<any> {
    const users = await this.appService.users({});
    return users;
  }

  @Get('users/store')
  async storeUser(): Promise<any> {
    const user = await this.appService.createUser({
      email: 'teste@teste.com',
      name: 'Teste',
      password: '123456',
    });
    return user;
  }
}
