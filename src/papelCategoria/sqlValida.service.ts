import { BadRequestException, Injectable } from "@nestjs/common";



@Injectable()
export class SqlValidaService{

    validaSql(sql: string){
        const proibido = ["DROP", "DELETE", "TRUNCATE", "ALTER"]

        const grande = sql.toUpperCase()

        for (const letras of proibido){
            if (grande.includes(letras)){
                throw new BadRequestException("Codigo Sql Não Permitido")
            }
        }

        return true
    }
}