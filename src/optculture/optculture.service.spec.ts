import { Test, TestingModule } from '@nestjs/testing';
import { OptcultureService } from './optculture.service';

describe('OptcultureService', () => {
  let service: OptcultureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptcultureService],
    }).compile();

    service = module.get<OptcultureService>(OptcultureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
