import { Component, input } from '@angular/core';
import { StackItem } from '../../../types/stack-item';

@Component({
  selector: 'app-stack-item-button',
  imports: [],
  templateUrl: './stack-item-button.html',
  styleUrl: './stack-item-button.scss'
})
export class StackItemButton {

  readonly item = input.required<StackItem>();

}
