import { HttpInterceptorFn } from '@angular/common/http';
const BASE_URL = 'https://api.themoviedb.org/3';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const clone = req.clone({
    url: `${BASE_URL}${req.url}`,

    params: req.params.set('api_key', 'a8b8bde8891f59b628ba32b8cf747490'),
  });

  return next(clone);
};
