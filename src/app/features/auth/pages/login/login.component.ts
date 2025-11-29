import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { SnackbarService } from '../../../../core/ui/snackbar.service';

@Component({
  selector: 'cm-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private snack = inject(SnackbarService);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async submit() {
    if (this.form.invalid) return;
    try {
      const { email, password } = this.form.getRawValue();
      await this.auth.login(email!, password!);
      this.snack.show('Bienvenido!!');
      this.router.navigateByUrl('/clients');
    } catch (e: any) {
      const code = e?.code ?? 'auth/error';
      const map: Record<string, string> = {
        'auth/invalid-credential': 'Credenciales inválidas',
        'auth/user-not-found': 'Usuario no encontrado',
        'auth/wrong-password': 'Contraseña incorrecta',
      };
      this.snack.show(map[code] ?? 'No se pudo iniciar sesión');
    }
  }
}
