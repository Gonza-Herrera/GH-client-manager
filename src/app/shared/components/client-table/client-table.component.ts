import { Component, Input, Output, EventEmitter, signal, computed, effect } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { BirthdatePipe } from '../../../core/pipes/birthdate.pipe';

@Component({
  selector: 'cm-client-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    BirthdatePipe
],
  templateUrl: `./client-table.component.html`,
  styleUrls: ['./client-table.component.scss'],
})

export class ClientTableComponent {
  @Input() data: any[] = [];
  @Input() total = 0;
  cols = ['nombre', 'apellido', 'edad', 'fechaNacimiento'];
  @Output() page = new EventEmitter<PageEvent>();
}
