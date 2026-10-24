import { Component, computed, input, output } from '@angular/core';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  KeyValuePipe,
  NgStyle,
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
    NgStyle,
    UpperCasePipe,
    DatePipe,
    CurrencyPipe,
    PercentPipe,
    DecimalPipe,
    SlicePipe,
    KeyValuePipe,
  ],
  templateUrl: './project-card.html',
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
   * Retour : string
   * Paramètres : aucun
   * Fonction : retourne la couleur de la barre de progression selon le taux de réalisation (rouge sous 34 %, orange jusqu'à 66 %, vert au-delà)
   */
  get barColor(): string {
    const rate = this.completionRate() * 100;
    if (rate < 34) return '#ef4444';
    if (rate <= 66) return '#f59e0b';
    return '#22c55e';
  }

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