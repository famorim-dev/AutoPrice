import { Module } from '@nestjs/common';
import { PapelCategoriaController } from './categoria.controller';
import { PapelCategoriaService } from './categoria.service';
import { SqlValidaService } from './validaSQL.service';
import { CsvService } from 'src/excel/criaCSV.service';
import { ExecutaConsultaService } from './executaConsulta.service';

@Module({
  imports: [],
  controllers: [PapelCategoriaController],
  providers: [PapelCategoriaService, SqlValidaService, CsvService, ExecutaConsultaService],
})
export class PapelCategoriaModule {}
