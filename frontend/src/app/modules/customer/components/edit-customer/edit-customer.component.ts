import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../models/customer.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})
export class EditCustomerComponent implements OnInit {
  editCustomerForm!: FormGroup;
  error = '';
  submitted = false;
  customerDetails: Customer = {
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
    private activeRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.editCustomerForm = this.formBuilder.group({
      name: [
        this.customerDetails.name,
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

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: params => {
        const id = params.get('id');

        if (id) {
          this.customerService.getCustomer(id).subscribe({
            next: response => {
              this.customerDetails = response;
            },
          });
        }
      },
    });
  }

  get f() {
    return this.editCustomerForm.controls;
  }

  isInvalid(field: string): boolean {
    return (
      this.f[field].invalid && (this.f[field].touched || this.f[field].dirty)
    );
  }

  onUpdate() {
    this.submitted = true;
    if (this.editCustomerForm.invalid) return;

    this.customerService
      .updateCustomer(this.customerDetails.$id, this.customerDetails)
      .subscribe({
        next: customer => {
          this.snackBar.open(
            `Partner ${this.customerDetails.$id} adatai sikeresen módosítva`,
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
