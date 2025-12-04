import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // En la vida real aquí leerías un token de un store o localStorage
  const token = 'FAKE_TOKEN_HTTPBOARD';

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
