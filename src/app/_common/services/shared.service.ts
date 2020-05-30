import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { VariableService } from './variable.service';
import { filter, startWith } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SharedService extends VariableService {

  private _source = {
    progress: new BehaviorSubject(false),
  };

  $ = {
    progress: this._source.progress.asObservable()
  };

  constructor() { 
    super();
  }

  updateSource(key: string, data: any) {
    this._source[key].next(data);
  }

}

export const order_menu = [
  { id: 0, display: 'Half dozen (1 flavor of fillings) - $10', quantity: 12, price: 10 },
  { id: 1, display: 'Dozen (bread only NO FILLINGS) - $15', quantity: 12, price: 15 },
  { id: 2, display: 'Dozen (Up to 2 flavors of fillings) - $20', quantity: 12, price: 20 },
  { id: 3, display: 'Dozen (Up to 4 flavors of fillings) - $25', quantity: 12, price: 25 },
  { id: 4, display: 'Per piece - $2', quantity: 0, price: 2 },
];

export const breads = [
  { id: 0, display: 'Plain', value: 'plain' },
  { id: 1, display: 'Ube', value: 'ube' },
  { id: 2, display: 'Chocolate', value: 'chocolate' },
  { id: 3, display: 'Cinnamon', value: 'cinnamon' }
];

export const crumbs = [
  { id: 0, display: 'Bread Crumbs', value: 'bread-crumbs' },
  { id: 1, display: 'Graham grounds', value: 'graham-grounds' },
  { id: 2, display: 'Cheese streusel', value: 'cheese-streusel' }
];

export const filings = [
  { id: 0, display: 'Plain', value: 'plain' },
  { id: 1, display: 'Ube (home made)', value: 'ube-home-made' },
  { id: 2, display: 'Ubs jam with cheese', value: 'ube-jam-with-cheese' },
  { id: 3, display: 'Cheese (Eden)', value: 'cheese-eden' },
  { id: 4, display: 'Cheese (Velveeta)', value: 'cheese-Velveeta' },
  { id: 5, display: 'Sweet butercream', value: 'sweet-butercream' },
  { id: 6, display: 'Coconut Jam (Matamis na bato)', value: 'coconut-jam-matamis-na-bato' },
  { id: 7, display: 'Cream cheese', value: 'cream-cheese' },
  { id: 8, display: 'Pastilas', value: 'pastilas' },
  { id: 9, display: 'Milo', value: 'milo' },
  { id: 10, display: 'Dulce de leche', value: 'dulce-de-leche' }
];

export const services = [
  { id: 0, display: 'Pick up', value: 'pick-up' },
  { id: 1, display: 'Delivery', value: 'delivery' }
];

export const time = [
  { id: 0, display: '12:00 pm', value: 12 },
  { id: 1, display: '1:00 pm', value: 13 },
  { id: 2, display: '2:00 pm', value: 14 },
  { id: 3, display: '3:00 pm', value: 15 },
  { id: 4, display: '4:00 pm', value: 16 },
  { id: 5, display: '5:00 pm', value: 17 },
  { id: 6, display: '6:00 pm', value: 18 },
  { id: 7, display: '7:00 pm', value: 19 }
];
