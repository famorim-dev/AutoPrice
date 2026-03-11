import {Body, Controller, Param, Post} from "@nestjs/common";
import { PapelCategoriaService } from "./categoria.service";
import { TarefaDto } from "./dto/tarefa.dto";


@Controller('papel-categoria')
export class PapelCategoriaController{
    constructor(private readonly service: PapelCategoriaService){}

    @Post(':id')
    async tarefa(@Body() body: TarefaDto,@Param('id') id: string){
        return await this.service.tarefa(body, id)
    }
}