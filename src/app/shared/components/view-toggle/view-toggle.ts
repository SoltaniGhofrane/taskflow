import { Component, input, model } from '@angular/core';

// Un bouton du toggle : la valeur interne + le texte affiché
export interface ToggleOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-view-toggle',
  imports: [],
  templateUrl: './view-toggle.html',
})
export class ViewToggle {
  options = input.required<ToggleOption[]>(); // les boutons à afficher (reçus du parent)
  selected = model.required<string>();        // le bouton actif (liaison bidirectionnelle)

  select(value: string): void {
    this.selected.set(value); // met à jour le parent automatiquement
  }
}