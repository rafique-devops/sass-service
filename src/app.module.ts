import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OptcultureModule } from './optculture/optculture.module';
import { GinesysModule } from './ginesys/ginesys.module';
import { ConfigModule } from '@nestjs/config';
import ginesysConfig from './ginesys/ginesys.config';

@Module({
  imports: [
    OptcultureModule,
    GinesysModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ginesysConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
