import { Module } from '@nestjs/common';
import { PapelCategoriaController } from './categoria.controller';
import { PapelCategoriaService } from './categoria.service';

@Module({
  imports: [],
  controllers: [PapelCategoriaController],
  providers: [PapelCategoriaService],
})
export class PapelCategoriaModule {}
