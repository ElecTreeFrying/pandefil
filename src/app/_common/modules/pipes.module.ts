import { NgModule } from '@angular/core';

import { UtilPipe } from '../pipes/util.pipe';


@NgModule({
  declarations: [
    UtilPipe
  ],
  exports: [
    UtilPipe
  ]
})
export class UtilPipeModule { }
