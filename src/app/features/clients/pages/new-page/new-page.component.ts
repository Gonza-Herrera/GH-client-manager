import { Component, inject } from '@angular/core';
import { FirestoreService } from '../../../../core/services/firestone.service';
import { SnackbarService } from '../../../../core/ui/snackbar.service';
import { ClientFormComponent } from '../../../../shared/components/client-form/client-form.component';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'cm-new-client-page',
  imports: [ClientFormComponent],
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss'],
})

export class NewPageComponent {
  private fs = inject(FirestoreService);
  private snack = inject(SnackbarService);
  private router = inject(Router);

  async save(v: any) {
    await this.fs.addClient(v);
    this.snack.show('Cliente creado');
    this.router.navigateByUrl('/clients');
  }

}
