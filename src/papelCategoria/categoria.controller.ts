import {Body, Controller, Param, Post } from "@nestjs/common";
import { PapelCategoriaService } from "./categoria.service";
import { GerarExcelDto } from "./dto/gerarExcel.dto";


@Controller('papel-categoria')
export class PapelCategoriaController{
    constructor(private readonly service: PapelCategoriaService){}

    @Post(':id')
    gerarExcel(@Body() body: GerarExcelDto,@Param('id') id: string){
        return this.service.gerarExcel(body, id)
    }
}