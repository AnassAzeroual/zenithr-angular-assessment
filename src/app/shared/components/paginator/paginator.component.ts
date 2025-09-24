import { Component, inject, Input } from '@angular/core';
import { NavigatorData } from '../../models/navigator.model';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})

export class PaginatorComponent {
  @Input() paginatorData: NavigatorData[] = [];
  srvHelper = inject(HelpersService);
}
