import { IsString } from "class-validator";

export class EtlDto{
    @IsString()
    nomeTabela: string
}