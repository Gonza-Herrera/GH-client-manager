import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BirthdatePipe } from '../../../core/pipes/birthdate.pipe';
import { NgIf } from '@angular/common';

@Component({
  selector: 'cm-client-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BirthdatePipe,
    NgIf
  ],
  templateUrl: `./client-form.component.html`,
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent {
  @Output() save = new EventEmitter<any>();

  private fb = inject(FormBuilder);

  loading = false;
  submitted = false;

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)]],
    apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)]],
    edad: [null, [Validators.required, Validators.min(0)]],
    fechaNacimiento: ['', [Validators.required]],
  });

  hasError(controlName: string, errorName: string) {
    const c = this.form.get(controlName);
    return c?.hasError(errorName) && (c.touched || c.dirty || this.submitted);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.save.emit(this.form.getRawValue());
    this.loading = false;
  }
}
