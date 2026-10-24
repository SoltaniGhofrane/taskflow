import { Component, computed, input } from '@angular/core';
import { LowerCasePipe, NgClass, NgStyle, TitleCasePipe } from '@angular/common';
import { User, UserRole } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';
import { UserProjectGroup } from '../user-project-group/user-project-group';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { InitialsPipe } from '../../../../shared/pipes/initials.pipe';

@Component({
  selector: 'app-user-card',
  imports: [UserProjectGroup, EmptyState, NgClass, NgStyle, TitleCasePipe, LowerCasePipe, InitialsPipe],
  templateUrl: './user-card.html',
})
export class UserCard {
  user = input.required<User>();
  projects = input.required<Project[]>();

  roleColors: Record<UserRole, string> = {
    'Développeur': '#3b82f6',
    'Designer': '#ec4899',
    'Chef de projet': '#8b5cf6',
    'Testeur': '#f59e0b',
  };

  myTasks = computed(() =>
    this.projects()
      .flatMap((p) => p.tasks)
      .filter((t) => t.assigneeId === this.user().id)
  );

  todoCount = computed(() => this.myTasks().filter((t) => t.status === 'En attente').length);
  inProgressCount = computed(() => this.myTasks().filter((t) => t.status === 'En cours').length);
  doneCount = computed(() => this.myTasks().filter((t) => t.status === 'Terminé').length);

  myProjects = computed(() =>
    this.projects().filter((p) => p.tasks.some((t) => t.assigneeId === this.user().id))
  );
}