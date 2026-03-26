import { BadRequestException, Injectable } from "@nestjs/common";
import { CsvService } from "src/excel/criaCSV.service";

import path from "path";
import { ExecutaConsultaService } from "src/papelCategoria/utils/executaConsulta.service";
import { EtlDto } from "./dto/etl.dto";

@Injectable()
export class EtlService{
    constructor(private readonly serviceCsv: CsvService, private readonly serviceConsulta: ExecutaConsultaService){}

    async tarefa(nomeTabela: EtlDto) {
        const sql = `SELECT * FROM tabela_final.${nomeTabela.nomeTabela}`
        
        if (!/^[a-z0-9]+(_[a-z0-9]+)*$/.test(nomeTabela.nomeTabela)) {
            throw new BadRequestException("Nome de tabela inválido")
        }

        const consulta = await this.serviceConsulta.executa(process.env.DATABASE_ETL!, sql)

        this.serviceCsv.criaCsvEmPasta(consulta, path.join(process.cwd(), 'src', 'excel', 'excelFinal'), `${nomeTabela.nomeTabela}_${Date.now()}.xlsx`)
        return "Gerando Planilha!"
    }
}