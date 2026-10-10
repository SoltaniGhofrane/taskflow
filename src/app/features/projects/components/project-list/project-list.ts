import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectCard } from '../project-card/project-card';
import { PROJECTS } from '../../data/projects.data';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-list',
  imports: [FormsModule, ProjectCard],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {
  projects: Project[] = PROJECTS;
  searchTerm = '';
  selectedProject: Project | null = null;

  get filteredProjects(): Project[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.projects.filter((p) => p.name.toLowerCase().includes(term));
  }

  onProjectSelected(project: Project): void {
    console.log(project);
    this.selectedProject = project;
  }
}