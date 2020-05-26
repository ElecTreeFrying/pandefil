import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'util'
})
export class UtilPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
