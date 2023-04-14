import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { templateEvent } from 'src/helpers/templateEvent';
import { Post } from 'src/posts/entities/post.entity';
import { Repository } from 'typeorm';
var cron = require('node-cron');
@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly emailService: EmailService,
  ) {
    this.handleSchedule();
  }
  async handleSchedule() {
    try {
      cron.schedule('* * * * * *', async () => {
        const date = new Date();
        const day = date.getDate(); // Trích xuất ngày
        const month = date.getMonth() + 1; // Trích xuất tháng (tháng bắt đầu từ 0 nên cần cộng thêm 1)
        const year = date.getFullYear(); // Trích xuất năm

        const result: string = `${year}-${month}-${day}`; // Tạo chuỗi kết quả
        const posts = await this.postRepository
          .createQueryBuilder('post')
          .leftJoinAndSelect('post.events', 'events')
          .leftJoinAndSelect('events.account', 'account')
          .leftJoinAndSelect('events.qrs', 'qrs')
          .where('post.startDay = :startDay', { startDay: result })
          .getMany();
        if (posts.length > 0) {
          for (let i = 0; i < posts.length; i++) {
            const { events, startTime, title } = posts[i];
            for (let j = 0; j < events.length; j++) {
              const event: any = events[j];
              const { email, username } = event.account;
              const qr = event.qrs[0].qr_link;
              await this.emailService.sendEmail(
                email,
                `JOIN OUR EVENT ON ${startTime} - ${day}/${month}/${year}`,
                templateEvent(
                  username,
                  `${day}/${month}/${year}`,
                  startTime,
                  title,
                ),
                qr,
              );
            }
          }
          // posts.forEach((post: any) => {
          //
          //   events.forEach(async (event: any) => {
          //     ;
          //    ;
          //
          //     await this;
          //   });
          // });
        }
      });
    } catch (error) {}
  }
}
