import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  appHighlight = input('');

  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private originalColor = '';

  /**
   * Retour : void
   * Paramètres : aucun
   * Fonction : mémorise la couleur de fond d'origine puis applique la couleur de surbrillance au survol
   */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.originalColor = this.el.nativeElement.style.backgroundColor;
    this.el.nativeElement.style.backgroundColor = this.appHighlight() || '#fef9c3';
  }

  /**
   * Retour : void
   * Paramètres : aucun
   * Fonction : rétablit la couleur de fond d'origine quand la souris quitte l'élément
   */
  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = this.originalColor;
  }
}