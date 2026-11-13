import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from './restaurants.service';
import { RESTAURANT_REPOSITORY } from './restaurants.repository';

describe('RestaurantsService', () => {
  let service: RestaurantsService;

  const mockRepository = {
    all: jest.fn().mockReturnValue([]),
    byId: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        {
          provide: RESTAURANT_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
