import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-empty-state',
  styleUrl: './empty-state.css',
  templateUrl: './empty-state.html',
})
export class EmptyState {
  // Message affiché (valeur par défaut si le parent n'en donne pas)
  message = input('Aucun résultat trouvé.');
}