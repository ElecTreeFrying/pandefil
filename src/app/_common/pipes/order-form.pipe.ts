import { Pipe, PipeTransform } from '@angular/core';
import { order_menu, breads, crumbs, filings, services, time } from '../services/shared.service';


@Pipe({
  name: 'orderForm'
})
export class OrderFormPipe implements PipeTransform {

  transform(value: any, option: string): any {

    if (!value) return;

    else if (option === 'order') {
      return value.split('-')[0];
    }

    else if (option === 'quantity') {
      return value.quantity === '' ? 12 : value.quantity;
    }

    else if (option === 'price') {
      return +value.split('$')[1];
    }

  }

}
