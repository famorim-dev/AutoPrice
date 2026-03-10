import { Injectable } from "@nestjs/common"
import {  PassThrough, Readable } from "stream";
import { format } from "@fast-csv/format";
import { pipeline } from "stream/promises";

@Injectable()
export class CsvService {

  criaCsv(stream: Readable) {
    const arquivoTemporario = new PassThrough()
    pipeline(stream, format({ headers: true }), arquivoTemporario).catch(err => { arquivoTemporario.destroy(err)})
    return arquivoTemporario
  }
}