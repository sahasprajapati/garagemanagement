import { Test, TestingModule } from '@nestjs/testing';
import { OwnedVehicleService } from './owned-vehicle.service';

describe('OwnedVehicleService', () => {
  let service: OwnedVehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnedVehicleService],
    }).compile();

    service = module.get<OwnedVehicleService>(OwnedVehicleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
