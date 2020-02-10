import {Component} from '@angular/core';
import {Option} from '../common/modules/multi-select/types/option';

@Component({
  selector: 's0-example',
  templateUrl: './example.component.html',
})
export class ExampleComponent {

  selectOptions: Option[];
  selectValue: Option[];

  constructor() {
    this.selectOptions = this.getSelectOptions();
    this.selectValue = this.getSelectValue();
  }

  getSelectOptions(): Option[] {
    return [
      {
        label: 'Group 1',
        children: [
          {
            label: 'Group 1.1',
            children: [
              { id: '1.1.1', label: 'Option 1.1.1' },
              { id: '1.1.2', label: 'Option 1.1.2' },
              { id: '1.1.3', label: 'Option 1.1.3' },
              { id: '1.1.4', label: 'Option 1.1.4' },
              { id: '1.1.5', label: 'Option 1.1.5' },
              { id: '1.1.6', label: 'Option 1.1.6' },
            ],
          },
          {
            label: 'Group 1.2',
            children: [
              { id: '1.2.1', label: 'Option 1.2.1' },
              { id: '1.2.2', label: 'Option 1.2.2' },
              { id: '1.2.3', label: 'Option 1.2.3' },
            ],
          },
          {
            label: 'Group 1.3',
            children: [
              { id: '1.3.1', label: 'Option 1.3.1' },
              { id: '1.3.2', label: 'Option 1.3.2' },
            ],
          },
        ],
      },
      {
        label: 'Group 2',
        children: [
          {
            label: 'Group 2.1',
            children: [
              { id: '2.1.1', label: 'Option 2.1.1' },
              { id: '2.1.2', label: 'Option 2.1.2' },
            ],
          },
          {
            label: 'Group 2.2',
            children: [
              { id: '2.2.1', label: 'Option 2.2.1' },
              { id: '2.2.2', label: 'Option 2.2.2' },
              { id: '2.2.3', label: 'Option 2.2.3' },
              { id: '2.2.4', label: 'Option 2.2.4' },
            ],
          },
        ],
      },
      {
        label: 'Group 3',
        children: [
          {
            label: 'Group 3.1',
            children: [
              { id: '3.1.1', label: 'Option 3.1.1' },
              { id: '3.1.2', label: 'Option 3.1.2' },
            ],
          },
          {
            id: '3.2',
            label: 'Option 3.2'
          }
        ],
      },
    ];
  }

  getSelectValue(): Option[] {
    return [
      {
        label: 'Group 1',
        children: [
          {
            label: 'Group 1.1',
            children: [
              {id: '1.1.1', label: 'Option 1.1.1'},
              {id: '1.1.2', label: 'Option 1.1.2'},
            ],
          },
        ],
      },
    ];
  }
}
