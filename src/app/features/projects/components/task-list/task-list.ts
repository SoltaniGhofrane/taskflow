import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Task, TaskStatus } from '../../models/task.model';
import { UserService } from '../../../../core/services/user.service';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';

@Component({
  selector: 'app-task-list',
  imports: [DatePipe, TruncatePipe, DeadlinePipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  tasks = input.required<Task[]>();
  showAssignee = input(true);

  private userService = inject(UserService);
  users = toSignal(this.userService.getUsers(), { initialValue: [] });

  /**
   * Retour : string
   * Paramètres : id (number | undefined)
   * Fonction : retourne le nom de l'utilisateur assigné, ou « Non assignée » si la tâche n'a pas d'assigné
   */
  assigneeName(id?: number): string {
    if (id === undefined) return 'Non assignée';
    return this.users().find((u) => u.id === id)?.name ?? 'Inconnu';
  }

  /**
   * Retour : string
   * Paramètres : status (TaskStatus)
   * Fonction : retourne la classe Tailwind de couleur de bordure selon le statut de la tâche
   */
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