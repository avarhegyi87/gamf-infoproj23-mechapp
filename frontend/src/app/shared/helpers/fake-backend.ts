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
import { FAKE_USERS, FAKE_CUSTOMERS, FAKE_VEHICLES } from "./data/fake-data";
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Customer } from 'src/app/modules/customer/models/customer.model';
import { Vehicle } from 'src/app/modules/vehicle/models/vehicle.model';

const users = FAKE_USERS;
const customers: Customer[] = FAKE_CUSTOMERS;
const vehicles: Vehicle[] = FAKE_VEHICLES;

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
      const parsedID = parseInt(url.split('?').slice(-1)[0]);
      switch (true) {
        case url.endsWith('auth/login') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();

        case url.endsWith('/customer/create') && method === 'POST':
          return addCustomer();
        case url.endsWith('/customer/getall') && method === 'GET':
          return getAllCustomer();
        case url.includes('/customer/get') && method === 'GET':
          return getCustomer(parsedID);
        case url.includes('/customer/put') && method === 'PUT':
          return updateCustomer(parsedID);
        case url.includes('/customer/delete') && method === 'DELETE':
          return deleteCustomer(parsedID);

        case url.endsWith('/vehicle/create') && method === 'POST':
          return addVehicle();
        case url.endsWith('/vehicle/getall') && method === 'GET':
          return getAllVehicles();
        case url.includes('/vehicle/getallbycust') && method === 'GET':
          return getAllVehiclesByCustomer(parsedID);
        case url.includes('/vehicle/get') && method === 'GET':
          return getVehicle(parsedID);
        case url.includes('/vehicle/put') && method === 'PUT':
          return updateVehicle(parsedID);
        case url.includes('/vehicle/delete') && method === 'DELETE':
          return deleteVehicle(parsedID);

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

    function getAllCustomer() {
      if (!isLoggedIn()) return unauthorized();
      return ok(customers);
    }

    function getCustomer(id: number) {
      if (!isLoggedIn()) return unauthorized();
      const customer = customers.find(customer => customer.$id === id);
      return ok(customer);
    }

    function updateCustomer(id: number) {
      if (!isLoggedIn()) return unauthorized();
      let customer = customers.find(customer => customer.$id === id);
      if (!customer) return error('Nem találni a megadott partnert.');
      const {name, country, postCode, city, street, houseNumber, email, phoneNumber, taxNumber} = body;
      const newData = {
        $id: customer.$id,
        name, country, postCode, city, street, houseNumber, email, phoneNumber, taxNumber,
      }
      customer = newData;

      return ok();
    }

    function deleteCustomer(id: number) {
      if (!isLoggedIn()) return unauthorized();
      const index = customers.findIndex(customer => customer.$id === id);
      if (index === -1) return error('Nem találni a megadott partnert.');
      customers.splice(index, 1);
      return ok();
    }

    function addVehicle() {
      if (!isLoggedIn()) return unauthorized();

      const lastId = vehicles.length ? vehicles[vehicles.length - 1].id : 0;
      const { customer, vin, licencePlate, mileage, carBrand, carMake, displacement, productionYear, fuelType } = body;
      const owner = customers.find(customerOptions => customerOptions.$id === customer.$id);
      if (!owner) return error('Nem találni a megadott partnert.');
      const newVehicle = {
        id: lastId + 1,
        customer: owner,
        vin, licencePlate, mileage, carBrand, carMake, displacement, productionYear, fuelType,
      };
      vehicles.push(newVehicle);
      return ok(newVehicle);
    }

    function getAllVehicles() {
      if (!isLoggedIn()) return unauthorized();
      return ok(vehicles);
    }

    function getAllVehiclesByCustomer(id: number) {
      if (!isLoggedIn()) return unauthorized();
      const vehiclesOfCustomer: Vehicle[] = vehicles.filter(vehicle => vehicle.customer.$id === id);
      return ok (vehiclesOfCustomer);
    }

    function getVehicle(id: number) {
      if (!isLoggedIn()) return unauthorized();
      const vehicle = vehicles.find(vehicle => vehicle.id === id);
      return ok(vehicle);
    }

    function updateVehicle(id: number) {
      if (!isLoggedIn()) return unauthorized();
      let vehicle = vehicles.find(vehicle => vehicle.id === id);
      if (!vehicle) return error('Nem találni a megadott járművet.');
      const {customer, vin, licencePlate, mileage, carBrand, carMake, displacement, productionYear, fuelType } = body;
      const newData = {
        id: vehicle.id,
        customer: customers.find(customerOptions => customerOptions.$id === customer.$id) || vehicle.customer,
        vin, licencePlate, mileage, carBrand, carMake, displacement, productionYear, fuelType,
      }
      vehicle = newData;

      return ok();
    }

    function deleteVehicle(id: number) {
      if (!isLoggedIn()) return unauthorized();
      const index = vehicles.findIndex(vehicle => vehicle.id === id);
      if (index === -1) return error('Nem találni a megadott járművet.');
      vehicles.splice(index, 1);
      return ok();
    }
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
