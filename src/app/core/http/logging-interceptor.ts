import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const started = performance.now();

  return next(req).pipe(
    tap({
      next: () => {
        const elapsed = performance.now() - started;
        console.log(`[HTTP] ${req.method} ${req.urlWithParams} (${elapsed.toFixed(0)} ms)`);
      },
      error: (error) => {
        const elapsed = performance.now() - started;
        console.error(
          `[HTTP ERROR] ${req.method} ${req.urlWithParams} (${elapsed.toFixed(0)} ms)`,
          error
        );
      },
    })
  );
};
