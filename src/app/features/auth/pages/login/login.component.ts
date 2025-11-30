import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../core/services/auth.service';
import { SnackbarService } from '../../../../core/ui/snackbar.service';

@Component({
  selector: 'cm-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private snack = inject(SnackbarService);

  hide = true;
  loading = false;
  submitted = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  hasError(controlName: string, errorName: string) {
    const control = this.form.get(controlName);
    return control?.hasError(errorName) && (control.touched || control.dirty || this.submitted);
  }

  async submit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();

    this.loading = true;
    try {
      await this.auth.login(email!, password!);
      this.snack.show('Bienvenido!');
      this.router.navigateByUrl('/clients');
    } catch (e: any) {
      const code = e?.code ?? 'auth/error';
      const map: Record<string, string> = {
        'auth/invalid-credential': 'Credenciales inválidas.',
        'auth/user-not-found': 'Usuario no encontrado.',
        'auth/wrong-password': 'Contraseña incorrecta.',
        'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.',
      };
      this.snack.show(map[code] ?? 'No se pudo iniciar sesión.');
    } finally {
      this.loading = false;
    }
  }
}
