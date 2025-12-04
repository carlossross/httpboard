import { HttpInterceptorFn } from '@angular/common/http';
import { SKIP_AUTH } from './http-context-tokens';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // En la vida real aquí leerías un token de un store o localStorage
  const token = 'FAKE_TOKEN_HTTPBOARD';

  // Si la request indicó "skip auth", la dejamos pasar sin tocarla
  if (req.context.get(SKIP_AUTH)) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
