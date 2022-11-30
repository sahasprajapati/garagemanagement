import { Test, TestingModule } from '@nestjs/testing';
import { OwnedVehicleController } from './owned-vehicle.controller';
import { OwnedVehicleService } from './owned-vehicle.service';

describe('OwnedVehicleController', () => {
  let controller: OwnedVehicleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnedVehicleController],
      providers: [OwnedVehicleService],
    }).compile();

    controller = module.get<OwnedVehicleController>(OwnedVehicleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
