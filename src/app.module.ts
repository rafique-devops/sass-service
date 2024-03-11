import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OptcultureModule } from './optculture/optculture.module';
import { GinesysModule } from './ginesys/ginesys.module';

@Module({
  imports: [OptcultureModule, GinesysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
