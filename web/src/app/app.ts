import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TasksPage } from './features/tasks/tasks.page';

@Component({
  imports: [
    RouterModule,
    TasksPage
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'web';
}
