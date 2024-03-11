import { Module } from '@nestjs/common';
import { GinesysService } from './ginesys.service';
import { GinesysController } from './ginesys.controller';

@Module({
  controllers: [GinesysController],
  providers: [GinesysService],
})
export class GinesysModule {}
