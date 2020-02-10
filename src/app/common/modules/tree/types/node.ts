import { Branch } from './branch';
import { NodeRole } from './node-role';

export interface Node {
  label: string;
  parent?: Branch;
  role?: NodeRole;
}
