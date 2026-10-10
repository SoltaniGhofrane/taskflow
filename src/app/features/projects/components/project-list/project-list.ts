import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectCard } from '../project-card/project-card';
import { PROJECTS } from '../../data/projects.data';
import { Project } from '../../models/project.model';
import {  signal,computed } from '@angular/core';

@Component({
  selector: 'app-project-list',
  imports: [FormsModule, ProjectCard],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {
projects = signal<Project[]>(PROJECTS);
searchTerm = signal('');
  selectedProject: Project | null = null;

// Après
filteredProjects = computed(() => {
  const term = this.searchTerm().trim().toLowerCase();
  return this.projects().filter((p) => p.name.toLowerCase().includes(term));
});

  onProjectSelected(project: Project): void {
    console.log(project);
    this.selectedProject = project;
  }
  // update() : modifie la liste à partir de l'ancienne valeur (ajoute un projet)
addProject(): void {
  this.projects.update((list) => [
    ...list,
    {
      id: list.length + 1,
      name: 'Nouveau projet',
      description: 'Projet ajouté avec update()',
      status: 'En attente',
      tasks: [],
    },
  ]);
}

// set() : remplace toute la liste par une nouvelle valeur (revient aux données de départ)
resetProjects(): void {
  this.projects.set(PROJECTS);
}
}

