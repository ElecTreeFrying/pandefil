import { Directive } from '@angular/core';
import { AbstractControl, ValidatorFn, Validator, FormControl, NG_VALIDATORS } from '@angular/forms';


@Directive({
  selector: '[emailValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }
  ]
})
export class EmailValidatorDirective implements Validator {

  private validator: ValidatorFn;
  
  constructor() {
    this.validator = this.validateFactory();
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }

  validateFactory() : ValidatorFn {
    return (input: AbstractControl) => {
      
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const value = input.value === null ? '' : input.value;

      const isValid = emailRegex.test(value.toLowerCase());

      if(isValid || input.value === '') {
          return null;
      } else {
        return {
          email: {
            valid: false
          }
        };
      }
    }
  }

}

@Directive({
  selector: '[emptyFieldValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EmptyFieldValidatorDirective, multi: true }
  ]
})
export class EmptyFieldValidatorDirective implements Validator {

  private validator: ValidatorFn;
  
  constructor() {
    this.validator = this.validateFactory();
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }

  validateFactory() : ValidatorFn {
    return (input: AbstractControl) => {
      
      const value = input.value === null ? '' : input.value;

      if (value !== '') {
          return null;
      } else {
        return {
          emptyField: {
            valid: false
          }
        };
      }
    }
  }

}
