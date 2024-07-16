import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cdate',
})
export class CdatePipe implements PipeTransform {
  transform(value: string): string {
    const res = new Date(value).toLocaleString();
    return res;
  }
}
