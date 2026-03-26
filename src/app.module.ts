import { Module } from '@nestjs/common';
import { PapelCategoriaModule } from './papelCategoria/categoria.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core'
import { EtlModule } from './ETL/etl.module';

@Module({
  imports: [ThrottlerModule.forRoot([{ttl: 60000,limit: 80,}]),
    PapelCategoriaModule,
    EtlModule
  ],
  controllers: [],
  providers: [{provide: APP_GUARD, useClass: ThrottlerGuard,},

  ],
})
export class AppModule {}
