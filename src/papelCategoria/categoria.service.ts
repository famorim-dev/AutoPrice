import { BadRequestException, Injectable } from "@nestjs/common";
import { SqlValidaService } from "./utils/validaSQL.service";
import { TarefaDto } from "./dto/tarefa.dto";
import prisma from "prisma/connect.prisma";
import { fila } from "src/filter/fila";
import { CsvService } from "src/excel/criaCSV.service";
import { ExecutaConsultaService } from "./utils/executaConsulta.service";



@Injectable()
export class PapelCategoriaService{
    constructor(private readonly validaSql: SqlValidaService, private readonly csvService: CsvService, private readonly executaConsulta: ExecutaConsultaService){}

    async tarefa(body: TarefaDto, id: string){
        return fila.add(async () => {
            const registro = await prisma.con.findUnique({where: {id: id}})

            if(!registro){
                throw new BadRequestException("Id Não encontrado")
            }

            const sql = this.validaSql.validaSql(body.inicio!, body.fim!, body.extract! ,registro.cod)
            console.log(sql)

            const executor = await this.executaConsulta.executa(
                registro.url,
                sql
            )
            console.log("passei do executor")

            const csv = this.csvService.criaCsv(executor)
            console.log("gerei o csv")

            return csv
        })
    }
}