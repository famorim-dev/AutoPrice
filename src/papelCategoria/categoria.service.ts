import { BadRequestException, Injectable } from "@nestjs/common";
import { SqlValidaService } from "./sqlValida.service";
import { getPool } from "src/database/pool";
import { GerarExcelDto } from "./dto/gerarExcel.dto";
import prisma from "prisma/con";



@Injectable()
export class PapelCategoriaService{
    constructor(private readonly validaSql: SqlValidaService){}

    async gerarExcel(body: GerarExcelDto, id: string){
        const registro = await prisma.con.findUnique({where: {id: id}})

        if(!registro){
            throw new BadRequestException("Id Não encontrado")
        }

        this.validaSql.validaSql(registro.cod)
        
        const con = getPool(registro.url)

        const data = [ body.inicio, body.fim, body.extract || null ]

        const query = await con.query(registro.cod, data)
    }
}