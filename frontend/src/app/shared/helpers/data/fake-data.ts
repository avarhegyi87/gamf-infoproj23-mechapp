import { Material } from 'src/app/modules/material/models/material.model';
import { Customer } from 'src/app/modules/customer/models/customer.model';
import { Role } from 'src/app/modules/users/models/role.model';
import { Vehicle } from 'src/app/modules/vehicle/models/vehicle.model';

export const FAKE_USERS = [
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

export const FAKE_CUSTOMERS: Customer[] = [
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

export const FAKE_VEHICLES: Vehicle[] = [
  {
    id: 1,
    customer: FAKE_CUSTOMERS[1],
    vin: '0123456789ABCDEFG',
    licencePlate: 'AABA123',
    mileage: 2000,
    carBrand: 'Mercedes',
    carMake: 'Class E',
    displacement: 2400,
    productionYear: 2023,
    fuelType: 'dizel',
  },
  {
    id: 2,
    customer: FAKE_CUSTOMERS[1],
    vin: '2244668800ABCDEFG',
    licencePlate: 'AAAA005',
    mileage: 15000,
    carBrand: 'Mercedes',
    carMake: 'Class A',
    displacement: 25000,
    productionYear: 2020,
    fuelType: 'dizel',
  },
  {
    id: 3,
    customer: FAKE_CUSTOMERS[0],
    vin: 'A0B1C2D3E4F567890',
    licencePlate: 'MTM717',
    mileage: 185000,
    carBrand: 'Opel',
    carMake: 'Astra J',
    displacement: 1600,
    productionYear: 2014,
    fuelType: 'benzin',
  },
];

export const FAKE_MATERIALS: Material[] = [
  {
    id: '10000000',
    description: 'Bosch féktárcsa',
    currentStock: 12,
    netPrice: 12000,
  },
  {
    id: '10000001',
    description: 'Denso gyújtógyertya',
    currentStock: 20,
    netPrice: 10000,
  },
  {
    id: '10000003',
    description: 'Mann-Filter olajszűrő',
    currentStock: 4,
    netPrice: 32000,
  },
  {
    id: '10000004',
    description: 'Liqui Moli Leichtlauf Super motorolaj',
    currentStock: 15,
    netPrice: 15000,
  },
  {
    id: '60000000',
    description: 'munkadíj',
    currentStock: 9999,
    netPrice: 15000,
  },
  {
    id: '60000000',
    description: 'munkadíj – sürgősségi',
    currentStock: 9999,
    netPrice: 25000,
  },
];
