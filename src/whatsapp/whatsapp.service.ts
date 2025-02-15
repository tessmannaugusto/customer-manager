import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class WhatsAppService {
  private apiUrl: string;
  private accessToken: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = `${this.configService.get('WHATSAPP_API_URL')}/${this.configService.get('WHATSAPP_PHONE_ID')}/messages`;
    this.accessToken = this.configService.get('WHATSAPP_ACCESS_TOKEN');
  }

  async sendMessage(dto: SendMessageDto) {
    try {
      const response = await this.httpService
        .post(
          this.apiUrl,
          {
            messaging_product: 'whatsapp',
            to: dto.to,
            type: 'text',
            text: { body: dto.message },
          },
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .toPromise();

      return response.data;
    } catch (error) {
      console.error(
        'Erro ao enviar mensagem:',
        error.response?.data || error.message,
      );
      throw new Error('Erro ao enviar mensagem');
    }
  }
}
