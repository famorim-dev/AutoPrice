import {Body, Controller, Post} from "@nestjs/common";
import { EtlService } from "./etl.service";
import { EtlDto } from "./dto/etl.dto";


@Controller('etl')
export class EtlController{
    constructor(private readonly service: EtlService){}

    @Post('')
    async tarefa(@Body() body: EtlDto){
        return await this.service.tarefa(body)
    }
}