import { Injectable } from '@nestjs/common';
import { extname } from 'path';
@Injectable()
export class FileService {
  async uploadImage(file: Express.Multer.File): Promise<any> {
    const fileExtension = extname(file.originalname);
    // you can save the file to the database or the file system here
    // this is just a simple example where the file info is returned
    return {
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      extension: fileExtension,
    };
  }
}
