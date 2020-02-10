import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TreeModule} from '../tree/tree.module';
import {IconModule} from '../icon/icon.module';
import {MultiSelectService} from './multi-select.service';
import {MultiSelectComponent} from './multi-select.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    IconModule,
    TreeModule,
  ],
  exports: [
    MultiSelectComponent,
  ],
  declarations: [
    MultiSelectComponent,
  ],
  providers: [
    MultiSelectService,
  ],
  entryComponents: [
  ],
})
export class MultiSelectModule {
}
