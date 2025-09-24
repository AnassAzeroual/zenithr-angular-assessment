import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicStepperComponent } from '../../components/dynamic-stepper/dynamic-stepper.component';

@Component({
  selector: 'app-full-screen-layout',
  templateUrl: './full-screen-layout.component.html',
  styleUrls: ['./full-screen-layout.component.scss'],
  imports: [DynamicStepperComponent, RouterOutlet]
})
export class FullScreenLayoutComponent { }
