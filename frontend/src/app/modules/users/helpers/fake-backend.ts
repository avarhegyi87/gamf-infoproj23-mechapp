import {
  Observable,
  delay,
  dematerialize,
  materialize,
  mergeMap,
  of,
  throwError,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

const users = [
  {
    $id: 1,
    email: 'adamvm@mechapp.hu',
    firstName: 'Adam',
    lastName: 'Varhegyi-Milos',
    role: Role.Manager,
    password: 'Jelszo1234',
  },
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('auth/login') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();

        default:
          return next.handle(request);
      }
    }

    function authenticate() {
      const { email, password } = body;
      const user = users.find(
        x => x.email === email && x.password === password,
      );

      if (!user) return error('Helytelen felhasználónév vagy jelszó');
      return ok({
        $id: user.$id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: 'fake-jwt-token',
      });
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: string | undefined) {
      return throwError(() => new Error(message));
    }

    function unauthorized() {
      return throwError(() => new Error('Unauthorized'));
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
