import { Injectable } from "@nestjs/common"
import { Readable } from "stream";
import {  mkdirSync } from "fs";
import path from "path";
import ExcelJS from "exceljs";

@Injectable()
export class CsvService {
  
  async criaCsvEmPasta(dados: Readable, pasta: string, nomeArquivo: string) {

    mkdirSync(pasta, { recursive: true });
    const arquivo = path.join(pasta, nomeArquivo);

    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({ filename: arquivo });
    const sheet = workbook.addWorksheet('Relatório');

    let headersSet = false;

    for await (const row of dados) {

      if (!headersSet) {
        const headerCols = Object.keys(row).map(key => ({ header: key.toUpperCase(), key }));
        sheet.columns = headerCols;
        headersSet = true;
      }

      sheet.addRow(row).commit();
    }
    await sheet.commit();
    await workbook.commit();
    
    return arquivo
  }
}