import { Component, effect, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [RouterOutlet],
})
export class MainLayoutComponent {
  isExpanded = signal(false);

  menuItems = [
    { name: 'Dashboard', path: 'assets/img/gotobuilder-menu.png', alt: 'gotobuilder-menu', active: true },
    { name: 'Engagements', path: 'assets/img/file-menu.png', alt: 'file-menu', active: false },
    { name: 'Reporting', path: 'assets/img/qa-menu.png', alt: 'qa-menu', active: false },
    { name: 'User Management', path: 'assets/img/team-menu.png', alt: 'team-menu', active: false },
  ];

  constructor() {
    effect(() => {
      console.log('Sidebar is expanded:', this.isExpanded());
    });
  }

  toggleSidebar() {
    this.isExpanded.update(value => !value);
  }

}
