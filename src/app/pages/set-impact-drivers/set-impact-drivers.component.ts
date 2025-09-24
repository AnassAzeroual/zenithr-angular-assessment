// set-impact-drivers.component.ts
import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HelpersService } from '../../shared/services/helpers.service';

// Custom validator: ensure sum of weights = 100


@Component({
  selector: 'app-set-impact-drivers',
  templateUrl: './set-impact-drivers.component.html',
  styleUrls: ['./set-impact-drivers.component.scss'],
  imports: [ReactiveFormsModule, FormsModule, DecimalPipe]
})
export class SetImpactDriversComponent {
  private formService = inject(HelpersService);
  form = this.formService.mainForm.get('impactDriversForm') as FormGroup;

  private readonly driversData = [
    { id: 'I', name: 'INNOVATION', avg: 88 },
    { id: 'M', name: 'MOTIVATION', avg: 67 },
    { id: 'P', name: 'PERFORMANCE', avg: 35 },
    { id: 'A', name: 'AUTONOMY', avg: 56 },
    { id: 'C', name: 'CONNECTION', avg: 32 },
    { id: 'T', name: 'TRANSFORMATIONAL LEADERSHIP', avg: 21 }
  ];

  /* -------------------------------------------------------------------------- */
  /*                             Signal for UI state                            */
  /* -------------------------------------------------------------------------- */
  drivers = signal(this.driversData);

  constructor() { }

  /* -------------------------------------------------------------------------- */
  /*                              Get total weight                              */
  /* -------------------------------------------------------------------------- */
  get totalWeight(): number {
    return Object.values(this.form.value)
      .reduce((sum: number, weight: unknown) => sum + Number(weight), 0);
  }

  /* -------------------------------------------------------------------------- */
  /*           Calculate overall score using form weights + driver avg          */
  /* -------------------------------------------------------------------------- */
  get overallScore(): number {
    return Math.round(
      this.driversData.reduce((sum, driver) => {
        const weight = this.form.get(driver.id)?.value || 0;
        return sum + (weight * driver.avg) / 100;
      }, 0)
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                    Check if form is valid (total = 100)                    */
  /* -------------------------------------------------------------------------- */
  get isValid(): boolean {
    return this.form.valid;
  }



  /* -------------------------------------------------------------------------- */
  /*                  Optional: Auto-balance or warn on change                  */
  /* -------------------------------------------------------------------------- */
  onWeightChange(): void {
    // Trigger validation
    this.form.updateValueAndValidity();
  }

  // ✅ Get control for template
  getControl(id: string): FormControl {
    return this.form.get(id) as FormControl;
  }
}