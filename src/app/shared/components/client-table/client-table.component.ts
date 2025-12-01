// src/app/shared/components/client-table/client-table.component.ts
import { Component, Input, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BirthdatePipe } from '../../../core/pipes/birthdate.pipe';

export interface Client {
  id?: string;
  nombre: string;
  apellido: string;
  edad: number;
  fechaNacimiento: string; // ISO
}

@Component({
  selector: 'cm-client-table',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, BirthdatePipe],
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss'],
})
export class ClientTableComponent implements OnChanges, AfterViewInit {
  @Input() data: Client[] = [];
  @Input() total = 0;

  cols: (keyof Client)[] = ['nombre', 'apellido', 'edad', 'fechaNacimiento'];
  dataSource = new MatTableDataSource<Client>([]);

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  // Si quisieras paginación del lado del cliente:
  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnChanges(): void {
    // actualizar data cuando cambia el @Input
    this.dataSource.data = this.data ?? [];
  }

  ngAfterViewInit(): void {
    // conectar el MatSort
    this.dataSource.sort = this.sort;

    // ordenar correctamente por tipos
    this.dataSource.sortingDataAccessor = (item: Client, property: string) => {
      switch (property) {
        case 'edad':
          return Number(item.edad) || 0;
        case 'fechaNacimiento':
          return new Date(item.fechaNacimiento).getTime() || 0;
        default:
          return (item as any)[property] ?? '';
      }
    };

    // Si querés paginación del lado del cliente, descomentá:
    // this.dataSource.paginator = this.paginator;
  }
}
