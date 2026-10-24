import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'deadline' })
export class DeadlinePipe implements PipeTransform {
  /**
   * Retour : string
   * Paramètres : value (string 'YYYY-MM-DD' | null | undefined)
   * Fonction : retourne l'échéance relative à aujourd'hui (« Pas d'échéance », « Aujourd'hui », « Demain », « Dans n jours » ou « En retard de n jour(s) »)
   */
  transform(value: string | null | undefined): string {
    if (!value) return "Pas d'échéance";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [year, month, day] = value.split('-').map(Number);
    const due = new Date(year, month - 1, day);

    const diff = Math.round((due.getTime() - today.getTime()) / 86400000);

    if (diff === 0) return "Aujourd'hui";
    if (diff === 1) return 'Demain';
    if (diff > 1) return `Dans ${diff} jours`;

    const late = -diff;
    return `En retard de ${late} jour${late > 1 ? 's' : ''}`;
  }
}