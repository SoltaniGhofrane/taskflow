import { Component, computed, input } from '@angular/core';
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { User } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';
import { UserProjectGroup } from '../user-project-group/user-project-group';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { InitialsPipe } from '../../../../shared/pipes/initials.pipe';
@Component({
  selector: 'app-user-card',
  imports: [UserProjectGroup, EmptyState, TitleCasePipe, LowerCasePipe,InitialsPipe],
  templateUrl: './user-card.html',
})
export class UserCard {
  user = input.required<User>();
  projects = input.required<Project[]>();

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