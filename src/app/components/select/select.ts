import { Component, computed, ElementRef, Host, HostListener, input, model, output, signal, ViewChild } from '@angular/core';

export type SelectOption<T = any> = {
  label: string;
  value: T;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.html',
  styleUrl: './select.scss'
})
export class Select {

  options = input<SelectOption[]>([]);
  placeholder = input<string>('');

  selected = model<any>();
  onChange = output<any>();

  selectedLabel = computed(() => {
    const selected = this.selected();
    return this.options()?.find(o => o.value === selected)?.label;
  });

  isOpen = signal(false);

  @ViewChild('selector') selector!: ElementRef;

  selectValue(option: SelectOption) {
    this.selected.set(option.value);
    this.close();
  }

  toggle() {
    this.isOpen.update(v => !v);
  }

  close() {
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    if (!this.selector?.nativeElement.contains(event.target)) {
      this.close();
    }
  }

}
