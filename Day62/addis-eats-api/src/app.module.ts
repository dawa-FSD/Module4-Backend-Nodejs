// import { Module } from '@nestjs/common';

// import { APP_GUARD } from '@nestjs/core';

// import { OrdersModule } from './orders/orders.module';

// // Use the actual path of your existing JWT guard.
// import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

// import { RolesGuard } from './common/guards/roles.guard';

// @Module({
//   imports: [
//     OrdersModule,

//     // Keep your existing AuthModule here.
//   ],

//   providers: [
//     {
//       provide: APP_GUARD,
//       useClass: JwtAuthGuard,
//     },

//     {
//       provide: APP_GUARD,
//       useClass: RolesGuard,
//     },
//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { OrdersModule } from './orders/orders.module';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [OrdersModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
