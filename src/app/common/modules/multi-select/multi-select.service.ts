import {Injectable} from '@angular/core';
import {Branch} from '../tree/types/branch';
import {Leaf} from '../tree/types/leaf';
import {Option} from './types/option';

@Injectable()
export class MultiSelectService {

  static getLabels(node: Branch | Leaf, labels: string[] = []): string[] {
    if (node) {
      if (node.hasOwnProperty('children')) {
        const branch = node as Branch;
        for (const child of branch.children) {
          this.getLabels(child, labels);
        }
      } else {
        const leaf = node as Leaf;
        labels.push(leaf.label);
      }
    }

    return labels;
  }

  static createOptionNode(node: Branch | Leaf): Option {
    const option: Option = {
      label: node.label,
    };

    if (node.hasOwnProperty('children')) {
      const branch: Branch = node as Branch;
      option.children = branch.children.map((n) => this.createOptionNode(n));
      return option;
    } else if (node.hasOwnProperty('id')) {
      const leaf: Leaf = node as Leaf;
      option.id = leaf.id;
      return option;
    }
  }

  static createTreeNode(option: Option): Branch | Leaf {
    if (option.hasOwnProperty('children')) {
      return {
        label: option.label,
        children: option.children.map((opt) => this.createTreeNode(opt)),
      };
    } else if (option.hasOwnProperty('id')) {
      return {
        id: option.id,
        label: option.label,
      };
    }
  }
}
