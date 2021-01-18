

import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { CommonService } from './common.service';
import { ExportMatTableToXlxs } from '@app/shared/lib/export-mat-table-to-xlxs';
import { DateHelper } from '@app/shared/lib/helpers/dateHelper';
import { MatTableDataSource } from '@angular/material/table';



@Injectable()
export class FileService {

  static EXCEL_TYPE: FileType = { contentType: 'application/vnd.ms-excel', extension: '.xls', replace: 'data:application/vnd.ms-excel;base64,' };
  static EXCEL_NEW_TYPE: FileType = { contentType: 'application/vnd.ms-excel', extension: '.xlsx', replace: 'data:application/vnd.ms-excel;base64,' };
  static PDF_TYPE: FileType = { contentType: 'application/pdf', extension: '.pdf', replace: 'data:application/pdf;base64,' };

  constructor(private commonService: CommonService
  ) {
  }

  public exportMatTable(exportable: ExportMatTableToXlxs, mtDataSource: MatTableDataSource<any>, filename: string, share = false) {
    const arrayExport = exportable.arrayBaseToExcel(
      mtDataSource.sortData(mtDataSource.filteredData, mtDataSource.sort)
    );
    if (!arrayExport || arrayExport.length === 0) {
      const action = share ? 'Paylaş' : 'Kaydet';
      this.commonService.showSnackBar('Kayıt Bulunamadı ?' + action + '!');
      return;
    }
    this.exportExcel(arrayExport, filename, share);
  }

  private exportExcel(json: any[], filename: string, share: boolean): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveBuffer(excelBuffer, filename, FileService.EXCEL_NEW_TYPE);
  }

  public saveBuffer(buffer: any, filename: string, fileType: FileType): void {
    const fullFilename = filename + '_' + DateHelper.getFormattedTime() + fileType.extension;
    const data: Blob = new Blob([buffer], { type: fileType.contentType });

    FileSaver.saveAs(data, fullFilename);
  }
}

export interface FileType {
  contentType: string;
  replace: string;
  extension: string;
}
