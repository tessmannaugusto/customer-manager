export class CreateGroupDto {
  name: string;
  description: string;
  status: 'active' | 'inactive';
  members?: string[];
  rules?: string[];
}
