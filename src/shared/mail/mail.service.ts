import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { join } from 'path';
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';

import { EnvService } from '../env';
import * as process from 'node:process';

@Injectable()
export class MailService {

  private transporter: nodemailer.Transporter;

  private readonly templates: {
    [key: string]: Handlebars.TemplateDelegate;
  } = {};

  constructor(
    private readonly envService: EnvService,
  ) {
    const { host, port, username, password } = this.envService.getMailEnv();
    this.transporter = nodemailer.createTransport({
      host, // SMTP 서버 주소
      port, // SMTP 포트 (일반적으로 587 사용)
      secure: false, // TLS를 사용할지 여부 (true는 포트 465에서 사용)
      auth: {
        user: username, // 이메일 계정
        pass: password, // 이메일 비밀번호 또는 앱 비밀번호
      },
    });
    this.loadTemplates();
  }

  /**
   * @todo 이메일에 OTP 인증번호를 발송합니다.
   */
  async sendOtpCode(email: string, otp: string) {
    try {
      const htmlContent = this.templates.otp({
        otp,
        appName: 'Alexandria Lib',
        year: new Date().getFullYear()
      });

      const info = await this.transporter.sendMail({
        from: '"dev.goraebap" <no-reply@example.com>',
        to: email,
        subject: '[Alexandria Lib] 인증 코드 안내',
        html: htmlContent,
      });
      console.log('Email sent:', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  private loadTemplates() {
    const templatesPath = join(process.cwd(), 'public');

    console.log(process.cwd())

    console.log(templatesPath);

    // OTP 템플릿 로드
    const otpTemplate = readFileSync(
      join(templatesPath, 'otp.template.html'),
      'utf-8',
    );
    this.templates.otp = Handlebars.compile(otpTemplate);
  }
}
