// import { Module } from '@nestjs/common';
// import { RestaurantsController } from './restaurants.controller';
// import { RestaurantsService } from './restaurants.service';

// @Module({
//   controllers: [RestaurantsController],
//   providers: [RestaurantsService]
// })
// export class RestaurantsModule {}
import { Module } from '@nestjs/common';

import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';

import {
  RESTAURANT_REPOSITORY,
  InMemoryRestaurantRepository,
} from './restaurants.repository';

@Module({
  controllers: [RestaurantsController],

  providers: [
    RestaurantsService,
    {
      provide: RESTAURANT_REPOSITORY,
      useClass: InMemoryRestaurantRepository,
    },
  ],
})
export class RestaurantsModule {}
