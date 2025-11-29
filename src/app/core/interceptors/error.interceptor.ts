import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { SnackbarService } from '../ui/snackbar.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snack = inject(SnackbarService);
  
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let msg = 'Error inesperado';
      switch (err.status) {
        case 0:
          msg = 'No hay conexión con el servidor';
          break;
        case 400:
          msg = 'Solicitud inválida (400)';
          break;
        case 401:
          msg = 'No autorizado (401)';
          break;
        case 403:
          msg = 'Prohibido (403)';
          break;
        case 404:
          msg = 'Recurso no encontrado (404)';
          break;
        case 500:
          msg = 'Error del servidor (500)';
          break;
        default:
          msg = `Error (${err.status}): ${err.statusText}`;
          break;
      }
      snack.show(msg);
      return throwError(() => err);
    })
  );
};
