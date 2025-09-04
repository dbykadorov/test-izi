import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./features/tasks/tasks.page').then(m => m.TasksPage),
  },
];
