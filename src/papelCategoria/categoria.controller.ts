import {Body, Controller, Param, Post, Res } from "@nestjs/common";
import { PapelCategoriaService } from "./categoria.service";
import { TarefaDto } from "./dto/tarefa.dto";
import type { Response } from "express";


@Controller('papel-categoria')
export class PapelCategoriaController{
    constructor(private readonly service: PapelCategoriaService){}

    @Post(':id')
    async tarefa(@Body() body: TarefaDto,@Param('id') id: string, @Res() res: Response){
        return await this.service.tarefa(body, id)
    }
}