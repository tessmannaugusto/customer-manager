/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendMessageDto } from './dto/sendMessageDto';
import axios from 'axios';
import { CustomersService } from 'src/customers/customers.service';

@Injectable()
export class WhatsAppService {
  private apiUrl: string;
  private accessToken: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly customersService: CustomersService,
  ) {
    this.apiUrl = `${this.configService.get('WHATSAPP_API_URL')}/${this.configService.get('WHATSAPP_PHONE_ID')}/messages`;
    this.accessToken = this.configService.get('WHATSAPP_ACCESS_TOKEN') || '';
  }

  async sendMessage(dto: SendMessageDto) {
    try {
      const response = await axios.post(
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
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', JSON.stringify(error));
      throw new Error('Erro ao enviar mensagem');
    }
  }

  async sendMessageToGroup(groupId: string, message: string) {
    try {
      const customers =
        await this.customersService.findCustomersByGroup(groupId);

      if (!customers.length) {
        throw new Error('Nenhum customer encontrado para esse grupo.');
      }

      const results = await Promise.allSettled(
        customers.map((customer) =>
          this.sendMessage({ to: customer.contact, message }),
        ),
      );

      return results.map((result, index) => ({
        phone: customers[index].contact,
        status: result.status === 'fulfilled' ? 'success' : 'failed',
        error: result.status === 'rejected' ? result.reason : null,
      }));
    } catch (error) {
      console.error(
        'Erro ao enviar mensagens para o grupo:',
        JSON.stringify(error),
      );
      throw new Error('Erro ao enviar mensagens para o grupo');
    }
  }
}
