export class CreateCustomerDto {
  name: string;
  cpf_cnpj: string;
  contact: string;
  group: string;
  email: string;
  status: 'active' | 'inactive';
}
