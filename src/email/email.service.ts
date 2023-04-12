import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EMAIL_PASSWORD, EMAIL_USERNAME } from 'src/contains';
@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    qr: string,
  ): Promise<void> {
    await this.transporter.sendMail({
      from: EMAIL_USERNAME,
      to,
      subject,
      text,
      attachments: [
        {
          filename: 'qr.png',
          cid: 'batman',
          path: qr,
        },
      ],
    });
  }
  async sendEmailToResetPassword(
    to: string,
    subject: string,
    text: string,
  ): Promise<void> {
    await this.transporter.sendMail({
      from: EMAIL_USERNAME,
      to,
      subject,
      html: text,
    });
  }
}
