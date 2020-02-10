import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Behavior} from './types/bahavior';
import {Leaf} from './types/leaf';
import {LeafState} from './types/leaf-state';
import {Size} from './types/size';

@Component({
  selector: 's0-tree-leaf',
  templateUrl: './tree-leaf.component.html',
})
export class TreeLeafComponent {
  @Input()
  node: Leaf;
  @Input()
  level: number;
  @Input()
  behavior: Behavior;
  @Input()
  size: Size;
  @Output()
  stateChange = new EventEmitter<LeafState>();

  toggleSelection() {
    if (this.node.state === '1') {
      this.stateChange.emit('0');
    } else {
      this.stateChange.emit('1');
    }
  }
}
