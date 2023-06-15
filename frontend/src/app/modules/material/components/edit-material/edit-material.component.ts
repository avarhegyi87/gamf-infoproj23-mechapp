import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Material } from '../../models/material.model';
import {
  MaterialTypeEnum,
  MaterialTypeToLabelMapping,
  findMatTypeByNumber,
} from '../../models/material-type.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from '../../services/material.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeletionModalComponent } from 'src/app/shared/components/deletion-modal/deletion-modal.component';

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.scss'],
})
export class EditMaterialComponent implements OnInit {
  editMaterialForm!: FormGroup;
  materials: Material[] = [];
  materialTypes = Object.values(MaterialTypeEnum);
  materialTypeMapping = MaterialTypeToLabelMapping;
  originalMaterialNumber!: string;
  currentMaterialType!: MaterialTypeEnum;
  currentMaterialTypeLabel: string | undefined;
  noStock = false;

  error = '';
  submitted = false;

  materialDetails: Material = {
    materialNumber: '',
    description: '',
    currentStock: 0,
    netPrice: 0,
  };

  constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private materialService: MaterialService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.editMaterialForm = this.formBuilder.group({
      materialNumber: [{ value: '', disabled: true }],
      materialType: [{ value: '', disabled: true }],
      description: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ]),
      ],
      currentStock: [
        '',
        Validators.compose([
          Validators.min(0),
          Validators.max(9999),
        ]),
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
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: params => {
        const id = params.get('id');
        if (id) {
          this.materialService.getMaterial(id).subscribe({
            next: response => {
              this.materialDetails = response;

              this.originalMaterialNumber = response.materialNumber;
              this.currentMaterialType = findMatTypeByNumber(
                response.materialNumber,
              );
              this.currentMaterialTypeLabel =
                MaterialTypeToLabelMapping[this.currentMaterialType];

              if (this.currentMaterialType === MaterialTypeEnum.service) {
                this.f['currentStock'].disable();
                this.noStock = true;
              }
            },
          });
        }
      },
    });
  }

  get f() {
    return this.editMaterialForm.controls;
  }

  isInvalid(field: string): boolean {
    return (
      this.f[field].invalid && (this.f[field].touched || this.f[field].dirty)
    );
  }

  onSubmit() {
    const submitButton = document.activeElement as HTMLButtonElement;
    if (submitButton.classList.contains('submit-button')) this.onUpdate();
  }

  onUpdate() {
    this.submitted = true;
    if (this.editMaterialForm.invalid) return;

    this.materialDetails.materialNumber = this.originalMaterialNumber;
    if (this.noStock) this.materialDetails.currentStock = 0;

    this.materialService
      .updateMaterial(this.materialDetails.materialNumber, this.materialDetails)
      .subscribe({
        next: mat => {
          this.snackBar.open(
            `${this.materialDetails.materialNumber} - ${this.materialDetails.description} adatai sikeresen módosítva.`,
            'OK',
            {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-primary'],
            },
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
