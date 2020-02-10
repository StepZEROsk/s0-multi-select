import { LeafState } from './leaf-state';
import { Node } from './node';

export interface Leaf extends Node {
  id: string;
  state?: LeafState;
}
