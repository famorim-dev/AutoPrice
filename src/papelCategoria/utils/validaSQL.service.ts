import { BadRequestException, Injectable } from "@nestjs/common";



@Injectable()
export class SqlValidaService{

    validaSql(inicio: string, fim: string, extract: string, sql: string){
        const proibido = ["DROP", "DELETE", "TRUNCATE", "ALTER"]

        const grande = sql.toUpperCase().trim()

        if (!grande.startsWith("SELECT")) {
            throw new BadRequestException("Somente SELECT permitido")
        }
        
        for (const letras of proibido){
            if (grande.includes(letras)){
                throw new BadRequestException("Codigo Sql Não Permitido")
            }
        }
        let sqlimpo = sql
            .replace("$1", `'${inicio}'`)
            .replace("$2", `'${fim}'`)
            
        if (!extract) {
            const parts = sqlimpo.split(/AND/i)

            if (parts.length >= 3) {
                sqlimpo = parts.slice(0, 2).join(' AND ')
            }
        } else {
            sqlimpo = sqlimpo.replace(/\$3/g, `'${extract}'`)
        }
        
        return sqlimpo
    }
}