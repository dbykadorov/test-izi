import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { TasksPageComponent } from '@izi/tasks/feature-list';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, HttpClientTestingModule],
      providers: [provideRouter(appRoutes), provideNoopAnimations()],
    }).compileComponents();
  });

  it('should render tasks page title', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', TasksPageComponent);
    const httpMock = TestBed.inject(HttpTestingController);
    httpMock.expectOne('/api/tasks').flush([]);
    httpMock.verify();
    const compiled = harness.routeNativeElement as HTMLElement;
    expect(compiled.querySelector('.tasks__header')?.textContent).toContain('Список задач');
  });
});
