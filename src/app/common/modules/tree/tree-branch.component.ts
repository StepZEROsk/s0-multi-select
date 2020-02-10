import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Behavior} from './types/bahavior';
import {Branch} from './types/branch';
import {BranchState} from './types/branch-state';
import {Size} from './types/size';

@Component({
  selector: 's0-tree-branch',
  templateUrl: './tree-branch.component.html',
})
export class TreeBranchComponent {
  @Input()
  node: Branch;
  @Input()
  level: number;
  @Input()
  behavior: Behavior;
  @Input()
  size: Size = 'sm';
  @Output()
  stateChange = new EventEmitter<BranchState>();

  toggleSelection() {
    if (this.node.state === '1') {
      this.stateChange.emit('0');
    } else {
      this.stateChange.emit('1');
    }
  }
}
