import { Injectable } from '@nestjs/common';
import { CreateGinesysDto } from './dto/create-ginesys.dto';
import { UpdateGinesysDto } from './dto/update-ginesys.dto';

@Injectable()
export class GinesysService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createGinesyDto: CreateGinesysDto) {
    return 'This action adds a new ginesy';
  }

  findAll() {
    return `This action returns all ginesys`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ginesy`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateGinesyDto: UpdateGinesysDto) {
    return `This action updates a #${id} ginesy`;
  }

  remove(id: number) {
    return `This action removes a #${id} ginesy`;
  }
}
