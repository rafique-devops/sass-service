import { Injectable } from '@nestjs/common';
import { CreateGinesyDto } from './dto/create-ginesy.dto';
import { UpdateGinesyDto } from './dto/update-ginesy.dto';

@Injectable()
export class GinesysService {
  create(createGinesyDto: CreateGinesyDto) {
    return 'This action adds a new ginesy';
  }

  findAll() {
    return `This action returns all ginesys`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ginesy`;
  }

  update(id: number, updateGinesyDto: UpdateGinesyDto) {
    return `This action updates a #${id} ginesy`;
  }

  remove(id: number) {
    return `This action removes a #${id} ginesy`;
  }
}
