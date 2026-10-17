import { Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Task, TaskStatus } from '../../models/task.model';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  tasks = input.required<Task[]>();
  showAssignee = input(true); // affiché par défaut, masqué dans UserProjectGroup

  private userService = inject(UserService);
  users = toSignal(this.userService.getUsers(), { initialValue: [] });

  assigneeName(id?: number): string {
    if (id === undefined) return 'Non assignée';
    return this.users().find((u) => u.id === id)?.name ?? 'Inconnu';
  }

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