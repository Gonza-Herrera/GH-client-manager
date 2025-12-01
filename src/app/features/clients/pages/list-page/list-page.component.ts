import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { FirestoreService } from '../../../../core/services/firestone.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { ClientTableComponent } from '../../../../shared/components/client-table/client-table.component';
import { FilterBarComponent } from '../../../../shared/components/filter-bar/filter-bar.component';
import { MatCard } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";

@Component({
  standalone: true,
  selector: 'cm-client-list-page',
  imports: [ClientTableComponent, FilterBarComponent, NgIf, MatCard, MatIcon],
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent {
  fs = inject(FirestoreService);
  search = signal('');

  filtered = computed(() => {
    const term = this.search().toLowerCase();
    return this.fs.clients().filter((c) => (c.nombre + c.apellido).toLowerCase().includes(term));
  });

  hasMore = computed(() => this.fs.clients().length < this.fs.total());

  constructor() {
    this.fs.loadFirstPage();
  }
   
  loadMore() {
    this.fs.loadNextPage();
  }
}
