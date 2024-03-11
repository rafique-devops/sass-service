import { Test, TestingModule } from '@nestjs/testing';
import { GinesysService } from './ginesys.service';

describe('GinesysService', () => {
  let service: GinesysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GinesysService],
    }).compile();

    service = module.get<GinesysService>(GinesysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
