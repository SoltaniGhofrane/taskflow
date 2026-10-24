import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  /**
   * Retour : string
   * Paramètres : value (string | null | undefined), limit (number, 50 par défaut), suffix (string, '...' par défaut)
   * Fonction : coupe le texte s'il dépasse la limite, retire les espaces de fin et ajoute le suffixe ; retourne une chaîne vide si la valeur est absente
   */
  transform(value: string | null | undefined, limit = 50, suffix = '...'): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.slice(0, limit).trimEnd() + suffix;
  }
}