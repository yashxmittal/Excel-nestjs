import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Workbook } from 'exceljs';
import * as tmp from 'tmp'
import { data } from './data';


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async downloadExcel(){
    if(!data){
      throw new NotFoundException("No data to Download")
    }

    let rows = []

    data.forEach(doc => {
      rows.push(Object.values(doc))
    })

    let book = new Workbook();

    let sheet = book.addWorksheet('sheet1')

    rows.unshift(Object.keys(data[0]))

    sheet.addRows(rows)

    let file = await new Promise((resolve, reject) => {
      tmp.file({ discardDesription: true, prefix : 'MyExcelSheet', postfix: '.xlsx', mode: parseInt('0600', 8 )}, async (err, file) => {
        if (err)
          throw new BadRequestException(err);

          book.xlsx.writeFile(file).then(_ => {
            resolve(file)
          }).catch(err => {
            throw new BadRequestException(err)
          })
        })
      })

    return file
  }
}
