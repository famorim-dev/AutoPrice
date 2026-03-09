import { BadRequestException, Injectable } from "@nestjs/common";
import { SqlValidaService } from "./validaSQL.service";
import { GerarExcelDto } from "./dto/gerarExcel.dto";
import prisma from "prisma/connect.prisma";
import { fila } from "src/filter/fila";
import { CsvService } from "src/excel/criaCSV.service";
import { ExecutaConsultaService } from "./executaConsulta.service";



@Injectable()
export class PapelCategoriaService{
    constructor(private readonly validaSql: SqlValidaService, private readonly csvService: CsvService, private readonly executaConsulta: ExecutaConsultaService){}

    async tarefa(body: GerarExcelDto, id: string){
        return fila.add(async () => {
            const registro = await prisma.con.findUnique({where: {id: id}})

            if(!registro){
                throw new BadRequestException("Id Não encontrado")
            }

            const sql = this.validaSql.validaSql(body.inicio!, body.fim!, body.extract! ,registro.cod)

            const executor = await this.executaConsulta.executa(
                registro.url,
                sql
            )

            await this.csvService.criaCsv()

            return "Arquivo Será enviado por Email!"
        })
    }
}