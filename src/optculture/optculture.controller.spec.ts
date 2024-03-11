import { Test, TestingModule } from '@nestjs/testing';
import { OptcultureController } from './optculture.controller';
import { OptcultureService } from './optculture.service';

describe('OptcultureController', () => {
  let controller: OptcultureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptcultureController],
      providers: [OptcultureService],
    }).compile();

    controller = module.get<OptcultureController>(OptcultureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
