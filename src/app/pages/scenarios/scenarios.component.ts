import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-scenarios',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.scss'],
  imports: [RouterLink]
})
export class ScenariosComponent implements OnInit {

  scenarios = [
    { name: 'Scenario A', respondents: 500, scoreRange: '0 - 100' },
    { name: 'Scenario B', respondents: 400, scoreRange: '10 - 90' },
    { name: 'Scenario C', respondents: 400, scoreRange: '10 - 90' },
  ];
  constructor() { }

  ngOnInit() {
  }

}
