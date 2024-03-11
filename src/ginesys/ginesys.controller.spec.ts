import { Test, TestingModule } from '@nestjs/testing';
import { GinesysController } from './ginesys.controller';
import { GinesysService } from './ginesys.service';

describe('GinesysController', () => {
  let controller: GinesysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GinesysController],
      providers: [GinesysService],
    }).compile();

    controller = module.get<GinesysController>(GinesysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
