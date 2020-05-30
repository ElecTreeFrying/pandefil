import { Pipe, PipeTransform } from '@angular/core';
import { filings } from '../services/shared.service';
import { MatOption } from '@angular/material/core';


@Pipe({
  name: 'orderForm'
})
export class OrderFormPipe implements PipeTransform {

  transform(value: any, option: string, object?: any): any {

    if (value === undefined) return;

    else if (option === 'order') {
      return value.split('-')[0];
    }

    else if (option === 'quantity') {
      return value.quantity === '' ? 12 : value.quantity;
    }

    else if (option === 'price') {
      const cost = +value.split('$')[1];

      if (cost !== 2) {
        return cost;
      } else {
        return cost * +object;
      }
    }

    else if (option === 'details-bread') {
      return object[+value].bread;
    }
    
    else if (option === 'details-crumbs') {
      return object[+value].crumbs;
    }
    
    else if (option === 'details-filings') {
      return object[+value].filings.join(', ');
    }
    
    else if (option === 'details-notes') {
      return object[+value].notes;
    }

    else if (option === 'order-name') {
      return value.split('-')[0];
    }

    else if (option === 'selected-bread') {
      return object.map(e => e.value.order)[value];
    }

    else if (option === 'instagram' || option === 'facebook') {
      return value === undefined || value === null || value === '' ? 'N/A' : value;
    }

  }

}
