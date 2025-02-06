import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customers.entity';
import { UpdateCustomerDto } from './dto/UpdateCustomerDto';
import { CreateCustomerDto } from './dto/CreateCustomerDto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const newCustomer = this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(newCustomer);
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async findOne(id: string): Promise<Customer | null> {
    return await this.customerRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer | null> {
    await this.customerRepository.update(id, updateCustomerDto);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
