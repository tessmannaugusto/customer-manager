import { Module } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [CustomersModule],
  providers: [WhatsAppService],
})
export class WhatsappModule {}
