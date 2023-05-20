import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @UsePipes(new ValidationPipe({ transform: true }))
  // @UseGuards(AuthGuard('jwt'))
  @Post()
  // @Roles(Role.ADMIN)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }
  // @UseGuards(AuthGuard('jwt'))
  @Get('/all')
  findAll() {
    return this.postsService.findAll();
  }
  // @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }
  // @UseGuards(AuthGuard('jwt'))
  // @Roles(Role.BUSSINESS)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }
  // @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  // @Roles(Role.BUSSINESS)
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
