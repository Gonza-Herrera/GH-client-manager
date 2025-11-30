import { Component, EventEmitter, Output, signal } from '@angular/core';
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
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [0, [Validators.required, Validators.min(0)]],
      fechaNacimiento: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) this.save.emit(this.form.value);
  }
  
}
