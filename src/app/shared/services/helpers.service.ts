import { inject, Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NavigatorData } from '../models/navigator.model';

const FORM_STORAGE_KEY = 'surveyFormData';
const sumValidator = (targetSum: number) => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control || !control.value) return null;

    const sum = Object.values(control.value).reduce((total: number, current: any) => total + (+current || 0), 0);
    return sum === targetSum ? null : { totalNot100: { value: sum, required: targetSum } };
  };
};
@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  /* -------------------------------------------------------------------------- */
  /*                                Stepper form                                */
  /* -------------------------------------------------------------------------- */
  readonly mainForm = this.createMainForm();
  private createMainForm() {
    const form = this.fb.group({
      productDetailsForm: this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        tenant: ['Tenant A', Validators.required],
        company: ['Company A', Validators.required],
        product: ['Tenant A', Validators.required]
      }),
      respondentsForm: this.fb.group({
        totalRespondents: [undefined, [Validators.required, Validators.min(1)]]
      }),
      distributionForm: this.fb.group({
        selectedCriteria: this.fb.array([])
      }),
      impactDriversForm: this.fb.group({
        I: [50, Validators.required],
        M: [10, Validators.required],
        P: [10, Validators.required],
        A: [11, Validators.required],
        C: [10, Validators.required],
        T: [10, Validators.required],
      }, { validators: sumValidator(100) }),
      enpsForm: this.fb.group({
        promoters: [60, [Validators.required, Validators.min(0), Validators.max(100)]],
        passives: [15, [Validators.required, Validators.min(0), Validators.max(100)]],
        detractors: [25, [Validators.required, Validators.min(0), Validators.max(100)]]
      }, {
        validators: sumValidator(100)
      }),
      commentsForm: this.fb.group({
        Innovation: ['', Validators.required],
        Motivation: ['', Validators.required],
        Performance: ['', Validators.required],
        Autonomy: ['', Validators.required],
        Connection: ['', Validators.required],
      }),
    });
    this.loadFormData(form);

    form.valueChanges.subscribe((res) => {
      console.log(res.distributionForm?.selectedCriteria);
      this.saveFormData(form);
    });

    return form;
  }
  /* ----------------------------------- End ---------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                 Save context of the form in session storage                */
  /* -------------------------------------------------------------------------- */

  private saveFormData(form: FormGroup): void {
    try {
      const rawData = form.getRawValue();
      sessionStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(rawData));
    } catch (e) {
      console.error('Failed to save form data', e);
    }
  }

  private loadFormData(form: FormGroup): void {
    try {
      const savedData = sessionStorage.getItem(FORM_STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        form.patchValue(parsedData, { emitEvent: false });
      }
    } catch (e) {
      console.error('Failed to load form data', e);
    }
  }

  clearSavedFormData(): void {
    sessionStorage.removeItem(FORM_STORAGE_KEY);
  }
  /* ----------------------------------- End ---------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                  Get route pages for paginator dynamically                 */
  /* -------------------------------------------------------------------------- */
  getSurveyPaginatorData(parentPath: string): NavigatorData[] {
    const surveyChildRoutes = this.router.config.find((r: Route) => r.path === parentPath)?.children || [];

    return surveyChildRoutes
      .filter((child: Route) => child.path && child.loadComponent)
      .map((child: Route, idx: number) => ({
        page: this.formatPageName(child.path),
        path: `/${parentPath}/${child.path}`,
        required: true,
        valid: true,
        current: location.pathname.includes(`/${parentPath}/${child.path}`)
      }));
  }

  currentRouteIndex(paginatorData: NavigatorData[]): number {
    return paginatorData.findIndex(step => step.current);
  }

  private formatPageName(path: string = ''): string {
    return path.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }
  /* ----------------------------------- End ---------------------------------- */

}
