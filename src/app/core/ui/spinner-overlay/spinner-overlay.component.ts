import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../services/loading.service';


@Component({
  selector: 'cm-spinner-overlay',
  standalone: true,
  imports: [NgIf, MatProgressSpinnerModule],
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.scss'],
})

export class SpinnerOverlayComponent {
  constructor(public loading: LoadingService) {}
}
