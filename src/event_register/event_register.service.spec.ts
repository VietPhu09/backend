import { Test, TestingModule } from '@nestjs/testing';
import { EventRegisterService } from './event_register.service';

describe('EventRegisterService', () => {
  let service: EventRegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventRegisterService],
    }).compile();

    service = module.get<EventRegisterService>(EventRegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
