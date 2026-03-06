import { BadRequestException, Injectable } from "@nestjs/common";
import { SqlValidaService } from "./sqlValida.service";
import { getPool } from "src/database/pool";
import { GerarExcelDto } from "./dto/gerarExcel.dto";
import prisma from "prisma/connect.prisma";
import { fila } from "src/filter/fila";
import { CsvService } from "src/excel/criaCSV.service";



@Injectable()
export class PapelCategoriaService{
    constructor(private readonly validaSql: SqlValidaService, private readonly csvService: CsvService){}

    async gerarExcel(body: GerarExcelDto, id: string){
        return fila.add(async () => {
            const registro = await prisma.con.findUnique({where: {id: id}})

            if(!registro){
                throw new BadRequestException("Id Não encontrado")
            }

            this.validaSql.validaSql(registro.cod)
            
            const con = getPool(registro.url)

            const sql = registro.cod
                .replace("$1", `'${body.inicio}'`)
                .replace("$2", `'${body.fim}'`)
                .replace("$3", body.extract ? `'${body.extract}'` : "NULL")

            return await this.csvService.criaCsv(
                con,
                sql
            )

        })
    }
}