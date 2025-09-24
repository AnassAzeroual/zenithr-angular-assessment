import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HelpersService } from '../../shared/services/helpers.service';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss'],
  imports: [ReactiveFormsModule, NgClass]
})
export class SelectProductComponent implements OnInit {
  formService = inject(HelpersService);
  form: FormGroup = this.formService.mainForm.get('productDetailsForm') as FormGroup;
  tenants: string[] = ['Tenant A', 'Tenant B', 'Tenant C'];
  companies: string[] = ['Company A', 'Company B', 'Company C'];
  products: string[] = ['Tenant A']; // Example data
  surveys: any[] = [
    { name: 'Employee Engagement Survey', creationDate: 'DD/MM/YYYY', startDate: 'DD/MM/YYYY', endDate: 'DD/MM/YYYY', checked: true },
    { name: 'Employee Engagement Survey', creationDate: 'DD/MM/YYYY', startDate: 'DD/MM/YYYY', endDate: 'DD/MM/YYYY', checked: false },
    { name: 'Employee Engagement Survey', creationDate: 'DD/MM/YYYY', startDate: 'DD/MM/YYYY', endDate: 'DD/MM/YYYY', checked: false },
  ];


  ngOnInit(): void {}

  onSurveySelect(index: number, isChecked: boolean) {
    this.surveys[index].checked = isChecked;
  }
}