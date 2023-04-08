import { IsEmail, IsNotEmpty } from 'class-validator';
import { Match } from 'src/decorator/match.decorator';
export class CreateAccountDto {
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  phone_number: string;
  @IsNotEmpty()
  sex: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  avatar?: string;
  @Match('password')
  comfirmPassword: string;
}
