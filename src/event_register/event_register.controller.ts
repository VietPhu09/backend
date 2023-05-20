import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EventRegisterService } from './event_register.service';
import { CreateEventRegisterDto } from './dto/create-event_register.dto';
import { UpdateEventRegisterDto } from './dto/update-event_register.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('event-register')
export class EventRegisterController {
  constructor(private readonly eventRegisterService: EventRegisterService) {}
  // @UseGuards(AuthGuard('jwt'))
  @Post()
  // @Roles(Role.CUSTOMER)
  create(@Body() createEventRegisterDto: CreateEventRegisterDto) {
    return this.eventRegisterService.create(createEventRegisterDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.eventRegisterService.findAll();
  }
  // @UseGuards(AuthGuard('jwt'))
  @Get('/check/:account/:post')
  // @Roles(Role.CUSTOMER)
  findOne(@Param('account') account: string, @Param('post') post: string) {
    return this.eventRegisterService.findOne(+account, +post);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventRegisterDto: UpdateEventRegisterDto,
  ) {
    return this.eventRegisterService.update(+id, updateEventRegisterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventRegisterService.remove(+id);
  }
}
