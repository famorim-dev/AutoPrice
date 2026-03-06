import { Module } from '@nestjs/common';
import { PapelCategoriaController } from './categoria.controller';
import { PapelCategoriaService } from './categoria.service';
import { SqlValidaService } from './sqlValida.service';
import { CsvService } from 'src/excel/criaCSV.service';

@Module({
  imports: [],
  controllers: [PapelCategoriaController],
  providers: [PapelCategoriaService, SqlValidaService, CsvService],
})
export class PapelCategoriaModule {}
