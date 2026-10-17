import { Component, computed, input } from '@angular/core';
import { Project } from '../../../projects/models/project.model';
import { TaskList } from '../../../projects/components/task-list/task-list';

@Component({
  selector: 'app-user-project-group',
  imports: [TaskList],
  templateUrl: './user-project-group.html',
})
export class UserProjectGroup {
  project = input.required<Project>();  // le projet à afficher
  userId = input.required<number>();    // l'utilisateur concerné

  // On garde seulement les tâches de ce projet assignées à cet utilisateur
  userTasks = computed(() =>
    this.project().tasks.filter((t) => t.assigneeId === this.userId())
  );
}