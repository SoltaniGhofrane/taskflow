import { Component, input, output } from '@angular/core';
import { Project, ProjectStatus } from '../../models/project.model';
import { TaskList } from '../task-list/task-list';

@Component({
  selector: 'app-project-card',
  imports: [TaskList],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  project = input.required<Project>();
  projectSelected = output<Project>();

  selectProject(): void {
    this.projectSelected.emit(this.project());
  }

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