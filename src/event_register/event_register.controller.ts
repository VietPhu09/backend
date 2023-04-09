import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventRegisterService } from './event_register.service';
import { CreateEventRegisterDto } from './dto/create-event_register.dto';
import { UpdateEventRegisterDto } from './dto/update-event_register.dto';

@Controller('event-register')
export class EventRegisterController {
  constructor(private readonly eventRegisterService: EventRegisterService) {}

  @Post()
  create(@Body() createEventRegisterDto: CreateEventRegisterDto) {
    return this.eventRegisterService.create(createEventRegisterDto);
  }

  @Get()
  findAll() {
    return this.eventRegisterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventRegisterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventRegisterDto: UpdateEventRegisterDto) {
    return this.eventRegisterService.update(+id, updateEventRegisterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventRegisterService.remove(+id);
  }
}
