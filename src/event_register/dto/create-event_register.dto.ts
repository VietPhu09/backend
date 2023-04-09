import { IsNotEmpty } from 'class-validator';

export class CreateEventRegisterDto {
  id: number;
  @IsNotEmpty()
  account: number;
  @IsNotEmpty()
  post: number;
}
