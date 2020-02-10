import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subject} from 'rxjs';
import {TreeService} from './tree.service';
import {Behavior} from './types/bahavior';
import {Branch} from './types/branch';
import {BranchState} from './types/branch-state';
import {Leaf} from './types/leaf';
import {LeafState} from './types/leaf-state';
import {Size} from './types/size';
import {Tree} from './types/tree';

@Component({
  selector: 's0-tree',
  templateUrl: './tree.component.html',
})
export class TreeComponent implements OnInit, OnChanges {

  @Input()
  data: Tree;
  @Input()
  behavior: Behavior = 'none';
  @Input()
  selected: Tree;
  @Input()
  size: Size = 'sm';
  @Input()
  search: Subject<string>;
  @Output()
  selectionChange: EventEmitter<Tree | Leaf> = new EventEmitter<Tree | Leaf>();
  private selectionMap: Map<string, Leaf>;
  public tree: Tree;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private treeService: TreeService,
  ) {}

  switchState(node: Branch | Leaf, state: LeafState | BranchState) {
    this.treeService.switchState(node, state);
    const selected: Branch = this.treeService.filterNodeByState(this.tree as Branch, '1') as Branch;
    this.selectionMap = this.treeService.getLeafsMap(selected);
    this.selectionChange.emit(selected ? {
      children: selected.children,
      numberOfLeafs: selected.numberOfLeafs,
    } : null);
  }

  selectLeaf(event: MouseEvent, leaf: Leaf) {
    this.selectionChange.emit(leaf);
  }

  private createNode(node: Branch | Leaf, parent: Branch): Branch | Leaf {
    node.parent = parent;
    node.role = TreeService.getNodeRole(node);

    if (node.role === 'branch') {
      const branch: Branch = node as Branch;

      branch.children.map((n) => this.createNode(n, branch));
      branch.numberOfLeafs = TreeService.countLeafs(branch);
      branch.numberOfSelectedLeafs = TreeService.countSelectedLeafs(branch);
      if (this.behavior === 'check-list' || this.selected !== undefined) {
        branch.state = TreeService.getBranchState(branch);
      }

      return branch;
    } else if (node.role === 'leaf') {
      const leaf: Leaf = node as Leaf;
      if (this.behavior === 'check-list' || this.selected !== undefined) {
        leaf.state = TreeService.getLeafState(leaf, this.selectionMap);
      }
      return leaf;
    }
  }

  private buildTree(tree: Tree): Tree {
    tree.children.map((n) => this.createNode(n, null));
    tree.numberOfLeafs = TreeService.countLeafs(tree as Branch);
    tree.numberOfSelectedLeafs = TreeService.countSelectedLeafs(tree as Branch);
    return tree;
  }

  ngOnInit(): void {
    if (this.search) {
      this.search.subscribe((keyword: string) => {
        this.tree = this.treeService.filterNodeByLabel(this.buildTree(JSON.parse(JSON.stringify(this.data))) as Branch, keyword) as Tree;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected !== undefined) {
      this.selectionMap = this.treeService.getLeafsMap(this.selected as Branch);
      if (!changes.selected.firstChange) {
        this.buildTree(this.tree);
      }
    }
    if (changes.data) {
      this.tree = this.buildTree(JSON.parse(JSON.stringify(this.data)));
    }
  }
}
