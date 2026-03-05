import { Module } from '@nestjs/common';
import { PapelCategoriaService } from './papelCategoria/categoria.service';

@Module({
  imports: [PapelCategoriaService],
  controllers: [],
  providers: [],
})
export class AppModule {}
