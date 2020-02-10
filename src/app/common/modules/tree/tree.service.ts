import {Injectable} from '@angular/core';
import {Branch} from './types/branch';
import {BranchState} from './types/branch-state';
import {Leaf} from './types/leaf';
import {LeafState} from './types/leaf-state';
import {NodeRole} from './types/node-role';

@Injectable()
export class TreeService {

  static searchInString(text, keyword): number {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').search(new RegExp(keyword, 'i'));
  }

  static countLeafs(node: Branch): number {
    let numberOfOptions = 0;

    for (const child of node.children) {
      if (TreeService.getNodeRole(child) === 'branch') {
        numberOfOptions += (child as Branch).numberOfLeafs;
      } else {
        numberOfOptions += 1;
      }
    }

    return numberOfOptions;
  }

  static countSelectedLeafs(node: Branch): number {
    let numberOfSelectedOptions = 0;

    for (const child of node.children) {
      if (TreeService.getNodeRole(child) === 'branch') {
        numberOfSelectedOptions += (child as Branch).numberOfSelectedLeafs;
      } else if (child.state === '1') {
        numberOfSelectedOptions += 1;
      }
    }

    return numberOfSelectedOptions;
  }

  static getNodeRole(node: Branch | Leaf): NodeRole {
    if (node.hasOwnProperty('children')) {
      return 'branch';
    } else if (node.hasOwnProperty('id')) {
      return 'leaf';
    } else {
      return null;
    }
  }

  static getBranchState(node: Branch): BranchState {
    if (node.children.length === node.children.filter((n) => n.state === '1').length) {
      return '1';
    } else if (node.children.length === node.children.filter((n) => n.state === '0').length) {
      return '0';
    } else {
      return '2';
    }
  }

  static getLeafState(option: Leaf, selection: Map<string, Leaf>): LeafState {
    if (selection && selection.get(option.id)) {
      return '1';
    } else {
      return '0';
    }
  }

  switchState(node: Branch | Leaf, state: LeafState | BranchState): void {
    node.state = state;
    if (node.role === 'branch') {
      const branch: Branch = node as Branch;
      for (const child of branch.children) {
        this.switchState(child, state);
      }
    } else if (node.role === 'leaf') {
      this.updateParent(node.parent);
    }
  }

  private updateParent(node: Branch): void {
    node.numberOfSelectedLeafs = TreeService.countSelectedLeafs(node);
    node.state = TreeService.getBranchState(node);
    if (node.parent) {
      this.updateParent(node.parent);
    }
  }

  filterNodeByState(node: Branch | Leaf, state: LeafState): Branch | Leaf {
    const children: (Branch | Leaf)[] = [];

    if (TreeService.getNodeRole(node) === 'branch') {
      for (const child of (node as Branch).children) {
        const filtered = this.filterNodeByState(child, state);
        if (filtered !== null) {
          children.push(filtered);
        }
      }
      if (children.length > 0) {
        const branch: Branch = {
          label: node.label,
          children,
        };
        branch.numberOfLeafs = TreeService.countLeafs(branch);
        return branch;
      } else {
        return null;
      }
    } else {
      const leaf = node as Leaf;
      if (leaf.state === state) {
        return {
          label: leaf.label,
          id: leaf.id,
        };
      } else {
        return null;
      }
    }
  }

  filterNodeByLabel(node: Branch | Leaf, keyword: string): Branch | Leaf {
    const filtered: (Branch | Leaf)[] = [];

    if (!keyword) {
      return node;
    }

    if (TreeService.getNodeRole(node) === 'branch') {
      const branch = node as Branch;

      if (branch.label && TreeService.searchInString(branch.label, keyword) > -1) {
        return branch;
      }

      for (const child of branch.children) {
        const filteredChild = this.filterNodeByLabel(child, keyword);
        if (filteredChild !== null) {
          filtered.push(filteredChild);
        }
      }

      if (filtered.length > 0) {
        branch.children = filtered;
        branch.expanded = true;
        branch.state = TreeService.getBranchState(branch);
        return branch;
      } else {
        return null;
      }
    } else {
      if (node.label && TreeService.searchInString(node.label, keyword) > -1) {
        return node;
      } else {
        return null;
      }
    }
  }

  getLeafsMap(node: Branch | Leaf, selection: Map<string, Leaf> = new Map<string, Leaf>()): Map<string, Leaf> {
    if (node) {
      if (TreeService.getNodeRole(node) === 'branch') {
        const branch = node as Branch;
        for (const child of branch.children) {
          this.getLeafsMap(child, selection);
        }
      } else {
        const leaf = node as Leaf;
        selection.set(leaf.id, leaf);
      }
    }
    return selection;
  }
}
