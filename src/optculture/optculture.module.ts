import { Module } from '@nestjs/common';
import { OptcultureService } from './optculture.service';
import { OptcultureController } from './optculture.controller';

@Module({
  controllers: [OptcultureController],
  providers: [OptcultureService],
})
export class OptcultureModule {}
