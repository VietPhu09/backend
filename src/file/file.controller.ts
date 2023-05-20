import { storage } from './../config/multer.config';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

@Controller('file')
export class FileController {
  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files', 300, { storage }))
  async file(@UploadedFiles() files) {
    console.log('files', files);
    return files;
  }
  // @Get('/image/:id')
  // async handleGetImages(@Param('id') id, @Res() res) {
  // return res.sendFile(join(process.cwd(), '/uploads/' + id));
  // }
}
