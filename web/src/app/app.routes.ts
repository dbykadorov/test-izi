import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@izi/tasks/feature-list').then((m) => m.TasksPageComponent),
  },
];
