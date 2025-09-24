import { NgClass } from '@angular/common';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HelpersService } from '../../shared/services/helpers.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  imports: [ReactiveFormsModule, FormsModule, NgClass]
})
export class CommentsComponent {
  @ViewChild('textarea') textareaRef!: ElementRef;
  formService = inject(HelpersService);
  form: FormGroup = this.formService.mainForm.get('commentsForm') as FormGroup;
  selectedDriver = signal<string>(this.controlKeys.at(0) || '');
  currentFormControl = signal<FormControl>(this.form.get(this.controlKeys[0]) as FormControl);

  get controlKeys(): string[] {
    return Object.keys(this.form.controls);
  }

  updateSelectedDriver(driver: string): void {
    this.selectedDriver.update(() => driver);
    this.currentFormControl.update(() => this.form.get(driver) as FormControl);
    // Focus the textarea after view updates
    setTimeout(() => {
      this.textareaRef?.nativeElement.focus();
    });
  }
}