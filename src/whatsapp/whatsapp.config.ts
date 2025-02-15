import { ConfigService } from '@nestjs/config';

export class WhatsAppConfig {
  constructor(private readonly configService: ConfigService) {}

  get apiUrl(): string {
    const apiUrl = this.configService.get<string>('WHATSAPP_API_URL') || '';
    const phoneId = this.configService.get<string>('WHATSAPP_PHONE_ID') || '';
    return `${apiUrl}/${phoneId}/messages`;
  }

  get accessToken(): string {
    return this.configService.get('WHATSAPP_ACCESS_TOKEN');
  }
}
