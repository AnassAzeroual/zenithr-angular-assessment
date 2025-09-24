import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HelpersService } from '../../shared/services/helpers.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-select-criteria',
  templateUrl: './select-criteria.component.html',
  styleUrls: ['./select-criteria.component.scss'],
  imports: [ReactiveFormsModule, FormsModule, NgClass]
})
export class SelectCriteriaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private formService = inject(HelpersService);

  /* -------------------------------------------------------------------------- */
  /*                              Get form directly                             */
  /* -------------------------------------------------------------------------- */
  form = this.formService.mainForm.get('distributionForm') as FormGroup;

  /* -------------------------------------------------------------------------- */
  /*                             Selectable criteria                            */
  /* -------------------------------------------------------------------------- */
  allCriteria = [
    { name: 'Age Group', selected: false },
    { name: 'Department', selected: false },
    { name: 'Gender', selected: false },
    { name: 'Location', selected: false },
  ];

  /* -------------------------------------------------------------------------- */
  /*                    Getter of selectedCriteria FormArray                    */
  /* -------------------------------------------------------------------------- */
  get selectedCriteria(): FormArray {
    return this.form.get('selectedCriteria') as FormArray;
  }

  ngOnInit() {
    this.syncCriteriaSelectionWithForm();
  }

  private syncCriteriaSelectionWithForm() {
    const loadedCriteriaNames = this.selectedCriteria.value.map((c: any) => c.name);
    this.allCriteria.forEach(criterion => {
      criterion.selected = loadedCriteriaNames.includes(criterion.name);
    });
  }

  /* -------------------------------------------------------------------------- */
  /*              Helper to add a criterion with predefined options             */
  /* -------------------------------------------------------------------------- */
  private setCriterionOptions(name: string, options: { name: string; percentage: number }[]) {
    const criterion = this.allCriteria.find(c => c.name === name);
    if (!criterion) return;

    criterion.selected = true;

    const criterionGroup = this.createCriterion(name);
    const optionsArray = criterionGroup.get('options') as FormArray;

    options.forEach(option => {
      optionsArray.push(this.createOption(option.name, option.percentage));
    });

    this.selectedCriteria.push(criterionGroup);
  }

  /* -------------------------------------------------------------------------- */
  /*               Get options FormArray for given criterion index              */
  /* -------------------------------------------------------------------------- */
  getOptions(index: number): FormArray {
    return this.selectedCriteria.at(index).get('options') as FormArray;
  }

  /* -------------------------------------------------------------------------- */
  /*                               Factory methods                              */
  /* -------------------------------------------------------------------------- */
  private createCriterion(name: string): FormGroup {
    return this.fb.group({
      name: [name],
      options: this.fb.array([], Validators.required)
    });
  }

  private createOption(name: string, percentage: number): FormGroup {
    return this.fb.group({
      name: [name],
      percentage: [percentage, [Validators.required, Validators.min(0)]]
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                         Toggle criterion selection                         */
  /* -------------------------------------------------------------------------- */
  onCriterionSelect(criterion: { name: string; selected: boolean }, index: number) {
    criterion.selected = !criterion.selected;

    if (criterion.selected) {
      this.selectedCriteria.push(this.createCriterion(criterion.name));
    } else {
      const idx = this.selectedCriteria.controls.findIndex(c => c.get('name')?.value === criterion.name);
      if (idx !== -1) {
        this.selectedCriteria.removeAt(idx);
      }
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                          Remove selected criterion                         */
  /* -------------------------------------------------------------------------- */
  removeCriterion(index: number) {
    const removedName = this.selectedCriteria.at(index).get('name')?.value;
    const criterion = this.allCriteria.find(c => c.name === removedName);
    if (criterion) criterion.selected = false;

    this.selectedCriteria.removeAt(index);
  }

  /* -------------------------------------------------------------------------- */
  /*                  Add new option to the selected criterion                  */
  /* -------------------------------------------------------------------------- */
  addOption(criterionIndex: number) {
    this.getOptions(criterionIndex).push(this.createOption('New', 0));
  }

  /* -------------------------------------------------------------------------- */
  /*                        Remove option from criterion                        */
  /* -------------------------------------------------------------------------- */
  removeOption(criterionIndex: number, optionIndex: number) {
    this.getOptions(criterionIndex).removeAt(optionIndex);
  }

  /* -------------------------------------------------------------------------- */
  /*                 Calculate total percentage for a criterion                 */
  /* -------------------------------------------------------------------------- */
  calculateTotal(criterionGroup: any): number {
    const options = criterionGroup.get('options') as FormArray;
    return options.controls.reduce((sum, control) => sum + (control.get('percentage')?.value || 0), 0);
  }
}