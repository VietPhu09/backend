import { Test, TestingModule } from '@nestjs/testing';
import { EventRegisterController } from './event_register.controller';
import { EventRegisterService } from './event_register.service';

describe('EventRegisterController', () => {
  let controller: EventRegisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventRegisterController],
      providers: [EventRegisterService],
    }).compile();

    controller = module.get<EventRegisterController>(EventRegisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
