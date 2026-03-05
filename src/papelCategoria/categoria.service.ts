import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { SqlValidaService } from "./sqlValida.service";
import { getPool } from "src/database/pool";
import { GerarExcelDto } from "./dto/gerarExcel.dto";



@Injectable()
export class PapelCategoriaService{
    constructor(private readonly prisma: PrismaClient, private readonly validaSql: SqlValidaService){}

    async gerarExcel(body: GerarExcelDto, id: string){
        const registro = await this.prisma.con.findUnique({where: {id: id}})

        if(!registro){
            throw new BadRequestException("Id Não encontrado")
        }

        this.validaSql.validaSql(registro.cod)
        
        const con = getPool(registro.url)

        const data = [ body.inicio, body.fim, body.extract || null ]

        const query = await con.query(registro.cod, data)
    }
}