import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';
import { UpdateGroupDto } from './dto/UpdateGroupDto';
import { CreateGroupDto } from './dto/CreateGroupDto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly GroupRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const newGroup = this.GroupRepository.create(createGroupDto);
    return await this.GroupRepository.save(newGroup);
  }

  async findAll(): Promise<Group[]> {
    return await this.GroupRepository.find();
  }

  async findOne(id: string): Promise<Group | null> {
    return await this.GroupRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateGroupDto: UpdateGroupDto,
  ): Promise<Group | null> {
    await this.GroupRepository.update(id, updateGroupDto);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.GroupRepository.delete(id);
  }
}
