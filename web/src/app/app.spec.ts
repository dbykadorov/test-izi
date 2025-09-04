import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { TasksPageComponent } from './features/tasks/tasks-page.component';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, TasksPageComponent],
    }).compileComponents();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Welcome web');
  });
});
