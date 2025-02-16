import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomersService],
  controllers: [CustomersController],
  exports: [CustomersService],
})
export class CustomersModule {}
