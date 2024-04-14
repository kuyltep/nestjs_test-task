import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUser(+id);
  }

  @Get('client-connect/:id')
  getUserAndCoinPrice(@Param('id') id: string) {
    return this.userService.getUserAndCoinPrice(+id);
  }
  @Post('client-disconnect/:id')
  disconnectClient(@Param('id') id: string) {
    return this.userService.disconnectClient(+id);
  }
}
