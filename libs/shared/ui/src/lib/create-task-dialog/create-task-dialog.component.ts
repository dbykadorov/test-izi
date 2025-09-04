import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-create-task-dialog',
  imports: [CommonModule, DialogModule, InputTextModule, ButtonModule, FormsModule],
  templateUrl: './create-task-dialog.component.html',
  styleUrl: './create-task-dialog.component.scss',
})
export class CreateTaskDialogComponent {
  @Input({ required: true }) public visible = false;
  @Input() public header = 'Добавление задачи';
  @Input() public placeholder = 'Введите название';
  @Input() public submitLabel = 'Создать';
  @Input() public loading = false;

  @Output() public visibleChange = new EventEmitter<boolean>();
  @Output() public submit = new EventEmitter<string>();

  public title = signal<string>('');

  public onVisibleChange(v: boolean): void {
    this.visibleChange.emit(v);
  }

  public onCancel(): void {
    this.visibleChange.emit(false);
  }

  public onOpen(): void {
    this.title.set('');
  }

  public onSubmit(): void {
    const value = this.title().trim();
    if (!value) {
      return;
    }

    this.submit.emit(value);
  }
}
