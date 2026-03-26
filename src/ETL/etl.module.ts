import { Module } from '@nestjs/common';
import { CsvService } from 'src/excel/criaCSV.service';
import { EtlController } from './etl.controller';
import { EtlService } from './etl.service';
import { ExecutaConsultaService } from 'src/papelCategoria/utils/executaConsulta.service';

@Module({
  imports: [],
  controllers: [EtlController],
  providers: [CsvService, EtlService, ExecutaConsultaService],
})
export class EtlModule {}
