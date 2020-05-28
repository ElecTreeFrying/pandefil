import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';

import { FirebaseService } from '../_common/services/firebase.service';

import { order_menu, breads, crumbs, filings, services, time } from '../_common/services/shared.service';
import { formA, formB, formC, formD } from './form';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  form: any;
  formA: FormGroup; formB: FormGroup; 
  formC: FormGroup; formD: FormGroup;
  
  summary: any;
  selections: any;
  steps: any[];
  dynamic: any;
  isNextDisable: any;
  
  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private iconRegistry: MatIconRegistry, 
    private sanitizer: DomSanitizer,
    private fire: FirebaseService
  ) { 
    iconRegistry.addSvgIcon(
      'dollar-sign-solid',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/dollar-sign-solid.svg')
    );
  }

  ngOnInit(): void {
  
    this.initializeVariables();
    this.initializeForms();
    this.formChanges();
  }

  private initializeVariables() {
    
    this.isNextDisable = {
      formA: true, formB: true, formC: true, formD: true
    };

    this.selections = {
      order_menu, breads, crumbs, filings, services, time
    };

    this.steps = [ false, false, false, false, false, false ];

    this.dynamic = {
      formA: {
        selections: { 0: { state: false, button: false } },
      }
    };

    this.steps.forEach((step: any, i: number) => {
      setTimeout(() => { this.steps[i] = true; }, 200 * (i+1));
    });
  }

  private initializeForms() {

    this.formA = this.fb.group({
      orders: this.fb.array([ this.fb.group(formA) ])
    });

    this.formB = this.fb.group(formB);

    this.formC = this.fb.group(formC);

    this.formD = this.fb.group(formD);
  }

  private formChanges() {

    this.formA.valueChanges.subscribe((res: any) => {
      setTimeout(() => {
        this.orderButtonConfig(res)
        this.isNextDisable.formA = this.formA.invalid;
      });
    });

    this.formB.valueChanges.subscribe((res: any) => {
      setTimeout(() => {
        this.isNextDisable.formB = this.formB.invalid;
      });
    });
    
    this.formC.valueChanges.subscribe((res: any) => {
      setTimeout(() => {
        this.isNextDisable.formC = this.formC.invalid;
      });
    });
    
    this.formD.valueChanges.subscribe((res: any) => {
      setTimeout(() => {
        this.isNextDisable.formD = this.formD.invalid;
      });
    });
  }

  private orderButtonConfig(res: any) {

    res.orders.forEach((order, i) => {
        
      if (this.dynamic.formA.selections[i].state) {
        this.dynamic.formA.selections[i].button = order.order !== '' && order.quantity !== '';
      } else {
        this.dynamic.formA.selections[i].button = order.order !== '';
      }
    });
  }

  get $formA() {
    return {
      order_menu: this.formA.get('order_menu'),
      order_menu_quantity: this.formA.get('order_menu_quantity'),
      orders: this.formA.get('orders') as FormArray,
    }
  }

  addOrder() { 

    this.$formA.orders.push(this.fb.group(formA)); 

    const length = this.$formA.orders.length - 1;

    Object.assign(this.dynamic.formA.selections, { [length]: { state: false, button: false } });
  }

  removeAddedOrder(index: number) {
    this.$formA.orders.removeAt(index); 
  }

  process() {

    if (this.formA.invalid || this.formB.invalid || this.formC.invalid || this.formD.invalid) return;

    const price = this.formA.value.orders.map((res: any) => {
      
      const itemPrice = +res.order.split('$')[1];
      const itemQuantity = res.quantity === '' ? 1 : res.quantity;
      
      res.price = itemQuantity * itemPrice;

      return res;
    }).reduce((a, c) => a + c.price, 0);

    const date = this.formD.value.date.format('MMMM Do YYYY');

    const order_date = moment().format('MMMM Do YYYY, h:mm:ss a');

    this.form = {
      ...this.formA.value, ...this.formB.value,
      ...this.formC.value, ...this.formD.value,
      price, date, order_date
    };
  }

  submit() {
    this.process();
    this.fire.order = this.form;
  }

}
