import {Directionality} from '@angular/cdk/bidi';
import {CdkOverlayOrigin, Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {Component, forwardRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Branch} from '../tree/types/branch';
import {Tree} from '../tree/types/tree';
import {Option} from './types/option';
import {MultiSelectService} from './multi-select.service';

@Component({
  selector: 's0-multi-select',
  templateUrl: './multi-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    }
  ],
})
export class MultiSelectComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @ViewChild(CdkOverlayOrigin, { static: true })
  private overlayOrigin: CdkOverlayOrigin;
  @ViewChild('optionsTemplate', { static: false })
  private optionsTemplate: TemplateRef<any>;

  @Input()
  options: Option[] = [];
  @Input()
  disabled = false;
  @Input()
  prompt = 'select';
  opened = false;
  tree: Tree;
  search = new Subject();
  selectionTree: Tree;
  selectionLabels: string[];
  selectionOptions: Option[] = null;
  private overlayRef: OverlayRef | null;
  private unsubscribe$ = new Subject();
  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(
    private overlay: Overlay,
    private directionality: Directionality,
    private viewContainerRef: ViewContainerRef,
  ) {}

  @Input()
  get value(): Option[] {
    return this.selectionOptions;
  }

  set value(value: Option[]) {
    this.selectionOptions = value;
    this.selectionTree = this.getTree(value);
    this.selectionLabels = MultiSelectService.getLabels(this.selectionTree as Branch).sort();
    this.onChange(value);
    this.onTouched();
  }

  getTree(options: Option[]): Tree {
    if (options) {
      return {
        children: options.map((option) => MultiSelectService.createTreeNode(option)),
      };
    } else {
      return null;
    }
  }

  getOptions(tree: Tree): Option[] {
    if (tree) {
      return tree.children.map((option) => MultiSelectService.createOptionNode(option));
    } else {
      return null;
    }
  }

  onSelectionChange(value: Tree) {
    this.value = this.getOptions(value);
  }

  open() {
    this.close();

    if (!this.disabled) {
      const positionStrategy = this.overlay.position()
        .flexibleConnectedTo(this.overlayOrigin.elementRef)
        .withFlexibleDimensions(true)
        .withPush(true)
        .withViewportMargin(10)
        .withGrowAfterOpen(true)
        .withPositions([{
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetX: 0,
          offsetY: 0,
        }]);

      const config: OverlayConfig = {
        positionStrategy,
        scrollStrategy: this.overlay.scrollStrategies.close(),
        direction: this.directionality.value,
        minWidth: this.overlayOrigin.elementRef.nativeElement.getBoundingClientRect().width,
        hasBackdrop: true,
        backdropClass: '',
      };

      this.overlayRef = this.overlay.create(config);

      this.overlayRef.attachments().pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
        this.opened = true;
      });

      this.overlayRef.detachments().pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
        this.opened = false;
      });

      this.overlayRef.backdropClick().pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
        this.close();
      });

      this.overlayRef.attach(new TemplatePortal(this.optionsTemplate, this.viewContainerRef));
    }
  }

  close() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  writeValue(value: Option[]): void {
    this.value = value;
  }

  ngOnInit(): void {
    this.tree = this.getTree(this.options);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
