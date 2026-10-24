import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Project } from '../../models/project.model';
import { PROJECTS } from '../../data/projects.data';
import { ProjectCard } from '../project-card/project-card';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
  selector: 'app-project-list',
  imports: [FormsModule, ProjectCard],
  templateUrl: './project-list.html',
})
export class ProjectList implements OnInit {
  private projectService = inject(ProjectService);

  projects = signal<Project[]>([]);
  searchTerm = signal('');
  selectedProject: Project | null = null;

  filteredProjects = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    return this.projects().filter((p) => p.name.toLowerCase().includes(term));
  });

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects.set(projects);
    });
  }

  onProjectSelected(project: Project): void {
    this.selectedProject = project;
    console.log(project);
  }

  addProject(): void {
    this.projects.update((list) => [
      ...list,
      {
        id: list.length + 1,
        name: 'Nouveau projet',
        description: 'Ajouté avec update()',
        status: 'En attente',
        startDate: new Date().toISOString().slice(0, 10), // NOUVEAU : date du jour 'YYYY-MM-DD'
        budget: 0,                                         // NOUVEAU : budget par défaut
        tasks: [],
      },
    ]);
  }

  resetProjects(): void {
    this.projects.set(PROJECTS);
  }
}