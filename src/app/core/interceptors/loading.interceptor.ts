import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loading = inject(LoadingService);
  loading.isLoading.set(true);
  return next(req).pipe(finalize(() => loading.isLoading.set(false)));
};
