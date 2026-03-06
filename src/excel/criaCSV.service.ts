import { Injectable } from "@nestjs/common"
import { Pool } from "pg"
import * as fs from "fs"
import copyTo from "pg-copy-streams"
import { pipeline } from "stream/promises"

@Injectable()
export class CsvService {

  async criaCsv(pool: Pool, sql: string) {

    const client = await pool.connect()

      await client.query("SET statement_timeout = 550000")

      const copyQuery = `
        COPY (${sql}) TO STDOUT WITH CSV HEADER
      `

      const stream = client.query(copyTo.to(copyQuery))

      return stream
  }

}