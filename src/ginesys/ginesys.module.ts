import { Module } from '@nestjs/common';
import { GinesysService } from './ginesys.service';
import { GinesysController } from './ginesys.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [GinesysController],
  providers: [GinesysService],
  imports: [HttpModule, ConfigModule],
})
export class GinesysModule {}
