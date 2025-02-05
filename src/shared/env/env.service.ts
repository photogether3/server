import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {

  constructor(
    private readonly configService: ConfigService,
  ) {
  }

  getAppEnv() {
    return {
      port: this.configService.get<string>('APP_PORT'),
      name: this.configService.get<string>('APP_NAME'),
      status: this.configService.get<string>('APP_STATUS'),
    };
  }

  getDBEnv() {
    return {
      url: this.configService.get<string>('DB_URL'),
      authToken: this.configService.get<string>('DB_AUTH_TOKEN'),
    };
  }

  getMailEnv() {
    return {
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<string>('MAIL_PORT'),
      username: this.configService.get<string>('MAIL_USERNAME'),
      password: this.configService.get<string>('MAIL_PASSWORD'),
    };
  }

  getDiscordEnv() {
    return {
      url: this.configService.get<string>('DISCORD_WEBHOOK_URL'),
    };
  }

  getFirebaseEnv() {
      return {
          storageUrl: this.configService.get<string>('FIREBASE_STORAGE_URL'),
          storageBucket: this.configService.get<string>('FIREBASE_STORAGE_BUCKET'),
      }
  }

  getJwtEnv() {
    return {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: Number(this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN')),
    };
  }
}
