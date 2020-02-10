import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ExampleComponent} from './example.component';
import {MultiSelectModule} from '../common/modules/multi-select/multi-select.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MultiSelectModule,
  ],
  exports: [
    ExampleComponent,
  ],
  declarations: [
    ExampleComponent,
  ],
  entryComponents: [],
  providers: [],
})
export class ExampleModule { }
