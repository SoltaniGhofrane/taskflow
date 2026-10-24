import { Component, computed, input, output } from '@angular/core';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  KeyValuePipe,
  PercentPipe,
  SlicePipe,
  UpperCasePipe,
} from '@angular/common';
import { Project, ProjectStatus } from '../../models/project.model';
import { TaskList } from '../task-list/task-list';

@Component({
  selector: 'app-project-card',
  imports: [
    TaskList,
    UpperCasePipe,
    DatePipe,
    CurrencyPipe,
    PercentPipe,
    DecimalPipe,
    SlicePipe,
    KeyValuePipe,
  ],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  project = input.required<Project>();
  projectSelected = output<Project>();

  completionRate = computed(() => {
    const tasks = this.project().tasks;
    if (tasks.length === 0) return 0;
    return tasks.filter((t) => t.status === 'Terminé').length / tasks.length;
  });

  averageCost = computed(() => {
    const tasks = this.project().tasks;
    if (tasks.length === 0) return 0;
    return this.project().budget / tasks.length;
  });

  priorityCounts = computed(() => {
    const counts: Record<string, number> = { Haute: 0, Moyenne: 0, Basse: 0 };
    for (const task of this.project().tasks) {
      counts[task.priority]++;
    }
    return counts;
  });

  /**
   * Retour : void
   * Paramètres : aucun
   * Fonction : émet le projet courant vers le composant parent
   */
  selectProject(): void {
    this.projectSelected.emit(this.project());
  }

  /**
   * Retour : string
   * Paramètres : status (ProjectStatus)
   * Fonction : retourne la classe Tailwind de couleur selon le statut du projet
   */
  statusClass(status: ProjectStatus): string {
    switch (status) {
      case 'Terminé':
        return 'text-green-700';
      case 'En cours':
        return 'text-blue-700';
      default:
        return 'text-gray-700';
    }
  }
}