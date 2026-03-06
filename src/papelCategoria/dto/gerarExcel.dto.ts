import { IsDateString, IsOptional } from "class-validator"

export class GerarExcelDto{
    
    @IsOptional()
    @IsDateString()
    inicio?: string

    @IsOptional()
    @IsDateString()
    fim?: string

    @IsOptional()
    @IsDateString()
    extract?: string
}