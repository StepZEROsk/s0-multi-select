import { Branch } from './branch';
import { Leaf } from './leaf';

export interface Tree {
  children: (Branch | Leaf)[];
  numberOfLeafs?: number;
  numberOfSelectedLeafs?: number;
}
