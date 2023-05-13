import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent implements OnInit {
  addCustomerForm!: FormGroup;
  error = '';
  submitted = false;

  private _addCustomerRequest = {
    $id: 0,
    name: '',
    country: '',
    postCode: 0,
    city: '',
    street: '',
    houseNumber: '',
    email: '',
    phoneNumber: '',
    taxNumber: 0,
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.addCustomerForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ]),
      ],
      country: [
        'Magyarország',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
      ],
      postCode: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(1000),
          Validators.max(99999),
        ]),
      ],
      city: ['', Validators.compose([Validators.required])],
      street: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ]),
      ],
      houseNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(25),
        ]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phoneNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(\+\d{1,3})\d{3}\d*$/),
        ]),
      ],
      taxNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/[0-9]{11}/),
        ]),
      ],
    });
  }

  get f() {
    return this.addCustomerForm.controls;
  }

  isInvalid(field: string): boolean {
    return (
      this.f[field].invalid && (this.f[field].touched || this.f[field].dirty)
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.addCustomerForm.invalid) return;

    this._addCustomerRequest.name = this.addCustomerForm.get('name')?.value;
    this._addCustomerRequest.country = this.addCustomerForm.get('name')?.value;
    this._addCustomerRequest.postCode =
      this.addCustomerForm.get('postCode')?.value;
    this._addCustomerRequest.city = this.addCustomerForm.get('city')?.value;
    this._addCustomerRequest.street = this.addCustomerForm.get('street')?.value;
    this._addCustomerRequest.houseNumber =
      this.addCustomerForm.get('houseNumber')?.value;
    this._addCustomerRequest.email = this.addCustomerForm.get('email')?.value;
    this._addCustomerRequest.phoneNumber =
      this.addCustomerForm.get('phoneNumber')?.value;
    this._addCustomerRequest.taxNumber =
      this.addCustomerForm.get('taxNumber')?.value;

    this.customerService.addCustomer(this._addCustomerRequest).subscribe({
      next: customer => {
        this.snackBar.open(
          `Partner sikeresen hozzáadva; azonosítója: ${customer.$id}`,
          'OK',
          {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-primary'],
          },
        );
        this.router.navigate(['customer/list']);
      },
      error: error => {
        this.error = error;
        this.snackBar.open(this.error, 'Close', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-warn'],
        });
      },
    });
  }
}
