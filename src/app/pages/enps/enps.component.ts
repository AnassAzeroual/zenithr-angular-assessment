import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { HelpersService } from '../../shared/services/helpers.service';

// Custom validator to ensure a group of form controls sums to a specific value.
const sumValidator = (targetSum: number) => {
  return (control: AbstractControl): ValidationErrors | null => {
    const sum = Object.values(control.value).reduce((total: number, current: any) => total + (+current), 0);
    return sum === targetSum ? null : { 'totalNotCorrect': { value: sum, required: targetSum } };
  };
};

@Component({
  selector: 'app-enps',
  templateUrl: './enps.component.html',
  styleUrls: ['./enps.component.scss'],
  imports: [ReactiveFormsModule, NgClass]
})
export class EnpsComponent implements OnInit {
  formService = inject(HelpersService);
  form: FormGroup = this.formService.mainForm.get('enpsForm') as FormGroup;
  totalPercentage: number = 0;
  overallScore: number = 0;

  @Output() formValid = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(values => {
      this.totalPercentage = this.getWeightageTotal(values);
      this.calculateOverallScore(values);
      this.formValid.emit(this.form.valid);
    });

    // Set initial values
    this.totalPercentage = this.getWeightageTotal(this.form.value);
    this.calculateOverallScore(this.form.value);
    this.formValid.emit(this.form.valid);
  }

  getWeightageTotal(values: any): number {
    return Object.values(values).reduce((total: number, current: any) => total + (+current), 0);
  }

  calculateOverallScore(values: any): void {
    const { promoters, detractors } = values;
    this.overallScore = (promoters - detractors) || 0;
  }
}