import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TreeBranchComponent} from './tree-branch.component';
import {TreeLeafComponent} from './tree-leaf.component';
import {TreeComponent} from './tree.component';
import {TreeService} from './tree.service';
import {IconModule} from '../icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
  ],
  exports: [
    TreeComponent,
  ],
  declarations: [
    TreeComponent,
    TreeBranchComponent,
    TreeLeafComponent,
  ],
  providers: [
    TreeService,
  ],
  entryComponents: [
    TreeBranchComponent,
    TreeLeafComponent,
  ],
})
export class TreeModule {}
