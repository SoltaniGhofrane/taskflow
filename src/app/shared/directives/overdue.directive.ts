import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appOverdue]',
})
export class OverdueDirective {
  dueDate = input<string | undefined>();
  done = input(false);

  /**
   * Retour : string
   * Paramètres : aucun
   * Fonction : retourne les classes de retard si la tâche n'est pas terminée et que son échéance est dépassée, sinon une chaîne vide
   */
  @HostBinding('class')
  get overdueClasses(): string {
    const due = this.dueDate();
    if (!due || this.done()) return '';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [year, month, day] = due.split('-').map(Number);
    const dueDay = new Date(year, month - 1, day);

    return dueDay < today ? 'border-red-500 bg-red-50' : '';
  }
}