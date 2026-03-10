import { IsDateString, IsEmail, IsOptional } from "class-validator"

export class TarefaDto{
    
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