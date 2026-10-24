import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'initials' })
export class InitialsPipe implements PipeTransform {
  /**
   * Retour : string
   * Paramètres : value (string | null | undefined)
   * Fonction : retourne en majuscules les initiales des deux premiers mots du nom, ou « ? » si la valeur est absente
   */
  transform(value: string | null | undefined): string {
    if (!value || !value.trim()) return '?';
    return value
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join('');
  }
}