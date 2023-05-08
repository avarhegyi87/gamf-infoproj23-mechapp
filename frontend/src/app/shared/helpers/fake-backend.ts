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
import { Role } from '../../modules/users/models/role.model';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Customer } from 'src/app/modules/customer/models/customer.model';

const users = [
  {
    $id: 1,
    email: 'adamvm@mechapp.hu',
    firstName: 'Adam',
    lastName: 'Varhegyi-Milos',
    role: Role.Manager,
    password: 'Jelszo1234',
  },
  {
    $id: 2,
    email: 'albert.csabai@mechapp.hu',
    firstName: 'Albert',
    lastName: 'Csabai',
    role: Role.Mechanic,
    password: 'Jelszo1234',
  },
];

const customers: Customer[] = [
  {
    $id: 1,
    name: 'Cégem Kft.',
    country: 'Magyarország',
    postCode: 1142,
    city: 'Budapest',
    street: 'Rákosszeg park',
    houseNumber: '5C',
    email: 'info@cegem.hu',
    phoneNumber: '+36203266674',
    taxNumber: 12345654321,
  },
  {
    $id: 2,
    name: 'GAMF',
    country: 'Magyarország',
    postCode: 4000,
    city: 'Kecskemét',
    street: 'Izsáki út',
    houseNumber: '1',
    email: 'gamf@gamf.hu',
    phoneNumber: '+36326382893',
    taxNumber: 99998877666,
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

        case url.endsWith('/customer/getall') && method === 'GET':
          return getAllCustomer();
        case url.endsWith('/customer/create') && method === 'POST':
          return addCustomer();

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

    function getAllCustomer() {
      if (!isLoggedIn()) return unauthorized();
      return ok(customers);
    }

    function addCustomer() {
      if (!isLoggedIn()) return unauthorized();

      const lastId = customers.length ? customers[customers.length - 1].$id : 0;
      const {
        name,
        country,
        postCode,
        city,
        street,
        houseNumber,
        email,
        phoneNumber,
        taxNumber,
      } = body;
      const newCustomer = {
        $id: lastId + 1,
        name,
        country,
        postCode,
        city,
        street,
        houseNumber,
        email,
        phoneNumber,
        taxNumber,
      };
      customers.push(newCustomer);
      return ok(newCustomer);
    }
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
