import { Injectable } from "@nestjs/common";
import QueryStream from "pg-query-stream";
import { getPool } from "src/database/pool";



@Injectable()
export class ExecutaConsultaService{
    constructor(){}

    async executa(con: string, sql: string){
        const connect = getPool(con)
        const cliente = await connect.connect()

        const consulta  = new QueryStream(sql)

        const fluxo = cliente.query(consulta)

        fluxo.on("end", () => cliente.release())
        fluxo.on("error", () => cliente.release())

        return fluxo
    }
}