export class UpdateCustomerDto {
  name?: string;
  cpf_cnpj?: string;
  contact?: string;
  group?: string;
  email?: string;
  status?: 'active' | 'inactive';
}
