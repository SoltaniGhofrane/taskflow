import { Component, signal } from '@angular/core';
import { ProjectList } from './features/projects/components/project-list/project-list';
import { UserList } from './features/users/components/user-list/user-list';
import { ToggleOption, ViewToggle } from './shared/components/view-toggle/view-toggle';

@Component({
  selector: 'app-root',
  imports: [ProjectList, UserList, ViewToggle],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Vue affichée : 'tasks' (projets) ou 'users' (utilisateurs)
  view = signal('tasks');

  // Les deux boutons du toggle
  viewOptions: ToggleOption[] = [
    { value: 'tasks', label: 'Par tâche' },
    { value: 'users', label: 'Par user' },
  ];
}