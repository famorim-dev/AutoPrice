import { Injectable } from "@nestjs/common"
import { Readable } from "stream";
import {  mkdirSync } from "fs";
import path from "path";
import ExcelJS from "exceljs";

@Injectable()
export class CsvService {
  
  async criaCsvEmPasta(dados: Readable, pasta: string, nomeArquivo: string) {

    mkdirSync(pasta, { recursive: true });
    let parte = 1
    let linhas = 0
    const LIMITE = 100000
    let arquivo = path.join(pasta, `${nomeArquivo}_${parte}.xlsx`)

    let workbook = new ExcelJS.stream.xlsx.WorkbookWriter({ filename: arquivo })
    let sheet = workbook.addWorksheet('Relatório')

    let headersSet = false
    let headerCols: any

    for await (const row of dados) {

      if (!headersSet) {
        const headerCols = Object.keys(row).map(key => ({ header: key.toUpperCase(), key }))
        sheet.columns = headerCols
        headersSet = true
      }
      if (linhas >= LIMITE) {
          await sheet.commit()
          await workbook.commit()

          parte++
          linhas = 0

          arquivo = path.join(pasta, `${nomeArquivo}_${parte}.xlsx`)
          workbook = new ExcelJS.stream.xlsx.WorkbookWriter({ filename: arquivo })
          sheet = workbook.addWorksheet('Relatório')
          sheet.columns = headerCols
      }
      
      sheet.addRow(row).commit()
      linhas++
    }
    await sheet.commit()
    await workbook.commit()
    
    return arquivo
  }
}