import { Component } from '@angular/core';
import { ProjectList } from './features/projects/components/project-list/project-list';
import { UserList } from './features/users/components/user-list/user-list';

@Component({
  selector: 'app-root',
  imports: [ProjectList, UserList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}