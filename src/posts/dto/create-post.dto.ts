import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  id: number;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  slot: number;
  files?: string;
  account?: number;
}
