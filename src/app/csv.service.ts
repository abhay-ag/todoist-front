import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  constructor() {}

  exportToCsv(data: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const csvOutput = XLSX.write(wb, { bookType: 'csv', type: 'array' });
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });

    saveAs(blob, `${fileName}.csv`);
  }
}
