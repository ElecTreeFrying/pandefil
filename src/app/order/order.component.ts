import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSelectionListChange } from '@angular/material/list';
import * as moment from 'moment';

import { FirebaseService } from '../_common/services/firebase.service';
import { SharedService } from '../_common/services/shared.service';

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
  selectedStep: number;

  selectedItem: number;
  selectedItemName: string;
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private iconRegistry: MatIconRegistry, 
    private sanitizer: DomSanitizer,
    private fire: FirebaseService,
    private shared: SharedService
  ) { 
    iconRegistry.addSvgIcon(
      'dollar-sign-solid',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/dollar-sign-solid.svg')
    );
  }

  sampleData() {
    this.formC.patchValue({
      fn: 'John James',
      ln: 'Ermitaño',
      address: '5 High Ridge Lane Ambler, PA 19002',
      phone: 1234567
    });
    this.formD.patchValue({
      date: moment()
    })    
  }

  ngOnInit(): void {
  
    this.initializeVariables();
    this.initializeForms();
    this.formChanges();
    // this.sampleData();
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

    this.formB = this.fb.group({
      flavors: this.fb.array([ this.fb.group(formB) ])
    });

    this.formC = this.fb.group(formC);

    this.formD = this.fb.group(formD);

    this.formC.patchValue(this.shared.userData);

  }

  get filingCount() {
    if (!this.selectedItemName) return 4;
    else if (this.selectedItemName.includes('Per piece')) return 4;
    return +this.selectedItemName.split('-')[0].replace(/\D/g, '');
  }

  selectedFilingsFactory: any = {
    0: null, 1: null, 2: null, 3: null, 4: null, 5: null
  };

  hideFillings: boolean = false;

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

      if (this.selectedStep !== 1) return;

      const selected = !this.selectedItem ? 0 : this.selectedItem;

      if (typeof res.flavors[selected].filings === 'string') {
        
        this.selections.filings = filings;
      } else {

        const selectedFilings = res.flavors[selected].filings.map(e => filings[e]);
  
        if (selectedFilings.length === this.filingCount) {
          this.selections.filings = selectedFilings;
          this.selectedFilingsFactory[this.selectedItem] = selectedFilings;
        } else {
          this.selections.filings = filings;
        }
      }
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

  log(event: MatSelectionListChange) {

    this.selectedItem = event.option.value;

    setTimeout(() => {
      this.hideFillings = this.selectedItemName.includes('NO FILLINGS'); 
    }, 15);

    if (!this.selectedFilingsFactory[this.selectedItem]) {
      this.selections.filings = filings;
    } else {
      this.selections.filings = this.selectedFilingsFactory[this.selectedItem];
    }
  }

  get $formA() {
    return {
      orders: this.formA.get('orders') as FormArray,
      flavors: this.formB.get('flavors') as FormArray
    }
  }

  addOrder() { 

    this.$formA.orders.push(this.fb.group(formA)); 
    this.$formA.flavors.push(this.fb.group(formB)); 

    const length = this.$formA.orders.length - 1;

    Object.assign(this.dynamic.formA.selections, { [length]: { state: false, button: false } });
  }

  removeAddedOrder(index: number) {
    this.$formA.orders.removeAt(index); 
    this.$formA.flavors.removeAt(index);
    this.selectedFilingsFactory[index] = this.selectedFilingsFactory[index+1];
    this.selectedFilingsFactory[index+1] = null;
    console.log(index);
  }

  process(step: any) {

    if (step.selectedIndex !== 4) return;

    if (this.formA.invalid || this.formB.invalid || this.formC.invalid || this.formD.invalid) return;

    const orders = this.formA.value.orders.map((res: any) => {
      res.no_filings = !res.order.includes('$15');
      return res;
    });

    const price = this.formA.value.orders.map((res: any) => {
      
      const itemPrice = +res.order.split('$')[1];
      const itemQuantity = res.quantity === '' ? 1 : res.quantity;
      
      res.price = itemQuantity * itemPrice;

      return res;
    }).reduce((a, c) => a + c.price, 0);

    const date = this.formD.value.date.format('MMMM Do YYYY');

    const order_date = moment().format('MMMM Do YYYY, h:mm:ss a');

    const flavors = this.formB.value.flavors.map((res) => {
      
      if (typeof res.filings === 'string') {
        res.filings = [];
        return res;
      }

      res.filings = res.filings.map((index) => filings.find(e => e.id === index).display);

      return res;
    });

    this.form = {
      orders, flavors,
      ...this.formC.value, ...this.formD.value,
      price, date, order_date
    };

  }

  personalInformation() {

  }

  exit() {
    this.shared.guardFactory = 0;
    this.router.navigate([ '/' ]);
  }

  submit() {
    this.fire.order = this.form;
  }

}
