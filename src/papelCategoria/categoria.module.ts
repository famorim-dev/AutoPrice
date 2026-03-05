import { Module } from '@nestjs/common';
import { PapelCategoriaController } from './categoria.controller';
import { PapelCategoriaService } from './categoria.service';
import { SqlValidaService } from './sqlValida.service';

@Module({
  imports: [],
  controllers: [PapelCategoriaController],
  providers: [PapelCategoriaService, SqlValidaService],
})
export class PapelCategoriaModule {}
