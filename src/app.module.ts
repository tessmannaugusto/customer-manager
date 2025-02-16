import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModule } from './group/group.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://neondb_owner:npg_MVW5dkcmC6TR@ep-lucky-frost-a43r9d2v-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    CustomersModule,
    GroupModule,
    WhatsappModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
