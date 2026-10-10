import { Component, input } from '@angular/core';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  tasks = input.required<Task[]>();

  borderClass(status: TaskStatus): string {
    switch (status) {
      case 'Terminé':
        return 'border-green-500';
      case 'En cours':
        return 'border-blue-500';
      default:
        return 'border-gray-400';
    }
  }
}