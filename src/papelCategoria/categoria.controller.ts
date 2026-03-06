import {Body, Controller, Param, Post, Res } from "@nestjs/common";
import { PapelCategoriaService } from "./categoria.service";
import { GerarExcelDto } from "./dto/gerarExcel.dto";
import type { Response } from "express";


@Controller('papel-categoria')
export class PapelCategoriaController{
    constructor(private readonly service: PapelCategoriaService){}

    @Post(':id')
    async gerarExcel(@Body() body: GerarExcelDto,@Param('id') id: string, @Res() res: Response){
       const stream = await this.service.gerarExcel(body, id)
         res.setHeader(
            "Content-Disposition",
            "attachment; filename=export.csv"
        )

        res.setHeader("Content-Type", "text/csv")

        stream.pipe(res)
    }
}