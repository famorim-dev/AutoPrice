import { Module } from '@nestjs/common';
import { PapelCategoriaModule } from './papelCategoria/categoria.module';

@Module({
  imports: [PapelCategoriaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
