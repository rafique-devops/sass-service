import { Injectable } from '@nestjs/common';
import { CreateOptcultureDto } from './dto/create-optculture.dto';
import { UpdateOptcultureDto } from './dto/update-optculture.dto';

@Injectable()
export class OptcultureService {
  create(createOptcultureDto: CreateOptcultureDto) {
    return 'This action adds a new optculture';
  }

  findAll() {
    return `This action returns all optculture`;
  }

  findOne(id: number) {
    return `This action returns a #${id} optculture`;
  }

  update(id: number, updateOptcultureDto: UpdateOptcultureDto) {
    return `This action updates a #${id} optculture`;
  }

  remove(id: number) {
    return `This action removes a #${id} optculture`;
  }
}
