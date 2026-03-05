import {Controller, Param, Post } from "@nestjs/common";
import { PapelCategoriaService } from "./categoria.service";


@Controller('papel-categoria')
export class PapelCategoriaController{
    constructor(private readonly service: PapelCategoriaService){}

    @Post(':id')
    gerarExcel(@Param('id') id: string){
        return this.service.gerarExcel(id)
    }
}