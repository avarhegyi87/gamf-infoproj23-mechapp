import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Material } from '../../models/material.model';
import { MaterialService } from '../../services/material.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  MaterialTypeEnum,
  MaterialTypeToLabelMapping,
} from '../../models/material-type.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss'],
})
export class AddMaterialComponent implements OnInit {
  addMaterialForm!: FormGroup;
  private lastMat!: any;
  private lastServ!: any;
  error = '';
  submitted = false;

  materialTypes = Object.values(MaterialTypeEnum);
  materialTypeMapping = MaterialTypeToLabelMapping;


  private _addMaterialRequest: Material = {
    id: '',
    description: '',
    currentStock: 0,
    netPrice: 0,
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private materialService: MaterialService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.addMaterialForm = this.formBuilder.group({
      materialType: [null, Validators.compose([Validators.required])],
      description: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
        ]),
      ],
      currentStock: [
        0,
        Validators.compose([Validators.min(0), Validators.max(9999)]),
      ],
      netPrice: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(0.01),
          Validators.max(9999999.99),
        ]),
      ],
    });
    this.materialService.getLastMaterial().subscribe(item => {
       this.lastMat = item.id; });
    this.materialService.getLastService().subscribe(item => {
       this.lastServ = item.id; });
  }

  get f() {
    return this.addMaterialForm.controls;
  }

  isInvalid(field: string): boolean {
    return (
      this.f[field].invalid && (this.f[field].touched || this.f[field].dirty)
    );
  }

  generateMaterialNumber(value: MaterialTypeEnum): string {
    let minValue = 0;
    switch (value) {
      case MaterialTypeEnum.material:
        minValue = this.lastMat;
        if (this.lastMat == null) minValue = 10000000;
        break;
      case MaterialTypeEnum.service:
        minValue = this.lastServ;
        if (this.lastServ == null) minValue = 60000000;
        break;
      default:
        return '';
    }
    let maxValue = minValue + 1;
    return maxValue.toString();
  }

  onSubmit() {
    this.submitted = true;
    if (this.addMaterialForm.invalid) return;

    this._addMaterialRequest.id = this.generateMaterialNumber(
      this.addMaterialForm.get('materialType')?.value,);
    this._addMaterialRequest.description =
      this.addMaterialForm.get('description')?.value;
    this._addMaterialRequest.netPrice =
      this.addMaterialForm.get('netPrice')?.value;
    this._addMaterialRequest.currentStock =
      this.addMaterialForm.get('currentStock')?.value;

    console.log('material request:', this._addMaterialRequest);
    this.materialService.addMaterial(this._addMaterialRequest).subscribe({
      next: material => {
        this.snackBar.open(
          `Alkatrész/szolgáltatás sikeresen hozzáadva: ${material.description})`,
          'OK',
          { duration: 3000, panelClass: ['mat-toolbar', 'mat-primary'] },
        );
        (async () => {
          await this.router.navigate(['material/list']);
        })();
      },
      error: err => {
        this.error = err;
        this.snackBar.open(this.error, 'Bezár', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-warn'],
        });
      },
    });
  }
}
