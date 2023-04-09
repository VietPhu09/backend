import { PartialType } from '@nestjs/mapped-types';
import { CreateEventRegisterDto } from './create-event_register.dto';

export class UpdateEventRegisterDto extends PartialType(CreateEventRegisterDto) {}
