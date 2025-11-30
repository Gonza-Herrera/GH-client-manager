import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'birthdate', standalone: true })
export class BirthdatePipe implements PipeTransform {
  transform(iso: string | Date): string {
    const d = typeof iso === 'string' ? new Date(iso) : iso;
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }
}
