import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-data-access',
  imports: [],
  templateUrl: './data-access.html',
  styleUrl: './data-access.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataAccess {}
