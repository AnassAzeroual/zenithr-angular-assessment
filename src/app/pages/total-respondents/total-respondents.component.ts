import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HelpersService } from '../../shared/services/helpers.service';

@Component({
  selector: 'app-total-respondents',
  templateUrl: './total-respondents.component.html',
  styleUrls: ['./total-respondents.component.scss'],
  imports: [ReactiveFormsModule, NgClass]
})
export class TotalRespondentsComponent {
  formService = inject(HelpersService);
  form: FormGroup = this.formService.mainForm.get('respondentsForm') as FormGroup;
}