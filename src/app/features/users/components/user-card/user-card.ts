import { Component, computed, input } from '@angular/core';
import { User } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';
import { UserProjectGroup } from '../user-project-group/user-project-group';

@Component({
  selector: 'app-user-card',
  imports: [UserProjectGroup],
  templateUrl: './user-card.html',
})
export class UserCard {
  user = input.required<User>();          // reçu du parent (UserList)
  projects = input.required<Project[]>(); // reçu du parent (UserList)

  // Toutes les tâches assignées à cet utilisateur
  myTasks = computed(() =>
    this.projects()
      .flatMap((p) => p.tasks)
      .filter((t) => t.assigneeId === this.user().id)
  );

  // Les 3 compteurs
  todoCount = computed(() => this.myTasks().filter((t) => t.status === 'En attente').length);
  inProgressCount = computed(() => this.myTasks().filter((t) => t.status === 'En cours').length);
  doneCount = computed(() => this.myTasks().filter((t) => t.status === 'Terminé').length);

  // Seulement les projets où l'utilisateur a au moins une tâche
  myProjects = computed(() =>
    this.projects().filter((p) => p.tasks.some((t) => t.assigneeId === this.user().id))
  );
}