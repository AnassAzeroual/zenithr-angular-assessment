import { Component, inject, OnInit } from '@angular/core';
import { HelpersService } from '../../services/helpers.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { NavigationEnd, Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dynamic-stepper',
  templateUrl: './dynamic-stepper.component.html',
  styleUrls: ['./dynamic-stepper.component.scss'],
  imports: [PaginatorComponent, NgClass]
})
export class DynamicStepperComponent implements OnInit {
  readonly mainForm = inject(HelpersService).mainForm;
  paginatorData: any[] = [];
  parentRoute = 'survey';
  currentPageIndex = 0;

  constructor(private helpers: HelpersService, private router: Router) {
    router.events.subscribe((res) => {
      if (res instanceof NavigationEnd) {
        this.loadSurveyPaginatorData();
      }
      this.currentPageIndex = this.helpers.currentRouteIndex(this.paginatorData);
    });
  }

  ngOnInit() {
    this.loadSurveyPaginatorData();
  }

  private loadSurveyPaginatorData() {
    this.paginatorData = this.helpers.getSurveyPaginatorData(this.parentRoute);
  }

  onNext() {
    this.router.navigate([this.paginatorData.at(this.currentPageIndex + 1).path]);
  }

  onPrevious() {
    this.router.navigate([this.paginatorData.at(this.currentPageIndex - 1).path]);
  }

  onCancel() {
    this.router.navigate(['/scenarios']);
  }

  onFinish() {
    console.log(this.mainForm.value);

    alert('Form submitted successfully!');
    this.router.navigate(['/scenarios']).then(() => {
      this.helpers.clearSavedFormData();
      this.mainForm.reset();
    });
  }
}