import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const clone = req.clone({
    url: `${environment.BASE_URL}${req.url}`,

    params: req.params.set('api_key', environment.tmdbApiKey),
  });

  return next(clone);
};
