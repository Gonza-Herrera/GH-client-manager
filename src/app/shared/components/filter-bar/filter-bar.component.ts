import { Component, EventEmitter, Output, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cm-filter-bar',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: `./filter-bar.component.html`,
  styleUrls: ['./filter-bar.component.scss'],
})

export class FilterBarComponent {
  @Output() filter = new EventEmitter<string>();
  onInput(e: Event) {
    this.filter.emit((e.target as HTMLInputElement).value ?? '');
  }
}
