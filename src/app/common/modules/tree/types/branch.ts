import { BranchState } from './branch-state';
import { Leaf } from './leaf';
import { Node } from './node';

export interface Branch extends Node {
  children: (Branch | Leaf)[];
  state?: BranchState;
  expanded?: boolean;
  numberOfLeafs?: number;
  numberOfSelectedLeafs?: number;
}
