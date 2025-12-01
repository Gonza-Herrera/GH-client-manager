import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cm-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [MatButtonModule, MatIcon],
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  async backToAuth() {
    await this.router.navigateByUrl('/auth');
  }
}
