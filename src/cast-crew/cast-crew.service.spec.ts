import { Test, TestingModule } from '@nestjs/testing';
import { CastCrewService } from './cast-crew.service';

describe('CastCrewService', () => {
  let service: CastCrewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CastCrewService],
    }).compile();

    service = module.get<CastCrewService>(CastCrewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
