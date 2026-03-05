import { BadRequestException, Injectable } from "@nestjs/common";
import prisma from "prisma/con";



@Injectable()
export class PapelCategoriaService{

    gerarExcel(id: string){
        const con = prisma.con.findUnique({where: {id: id}})

        if(!con){
            throw new BadRequestException("Id Não encontrado")
        }

        
    }
}