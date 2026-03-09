import {Body, Controller, Param, Post, Res } from "@nestjs/common";
import { PapelCategoriaService } from "./categoria.service";
import { GerarExcelDto } from "./dto/gerarExcel.dto";


@Controller('papel-categoria')
export class PapelCategoriaController{
    constructor(private readonly service: PapelCategoriaService){}

    @Post(':id')
    async tarefa(@Body() body: GerarExcelDto,@Param('id') id: string){
        return await this.service.tarefa(body, id)
    }
}