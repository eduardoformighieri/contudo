import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendRetrievePassword(email: string, code: string): Promise<any> {
    return await this.mailerService
      .sendMail({
        to: email,
        subject: 'Account recovery',

        html: `Here is your code to reset your password: ${code}`,
      })
      .then(() => {})
      .catch(() => {});
  }

  async sendFirstAccess(email: string, token: string): Promise<any> {
    return await this.mailerService
      .sendMail({
        to: email,
        subject: 'First access link',

        html: `Welcome, please click on the link below to set your password and complete your registration: ${process.env.CLIENT_URL_DEVELOPMENT}${token}`,
      })
      .then(() => {})
      .catch(() => {});
  }

  async sendGuestReportUpdate(email: string, message: string): Promise<any> {
    return await this.mailerService
      .sendMail({
        to: email,
        subject: 'New report update',

        html: `${message}`,
      })
      .then(() => {})
      .catch(() => {});
  }
}
