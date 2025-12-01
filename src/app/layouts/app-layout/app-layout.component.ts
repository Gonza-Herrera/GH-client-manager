import { Component, inject } from '@angular/core';
import { RouterLink, Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { SpinnerOverlayComponent } from '../../core/ui/spinner-overlay/spinner-overlay.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    NgIf,
    RouterOutlet,
    SpinnerOverlayComponent
],
  templateUrl: './app-layout.component.html',
  styleUrls: [
    './app-layout.component.scss',
  ],
})

export class AppLayoutComponent {

  auth = inject(AuthService);
  router = inject(Router);

  async logout() {
    await this.auth.logout();
    this.router.navigateByUrl('/auth');
  }

}
