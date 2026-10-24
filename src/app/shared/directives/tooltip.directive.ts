import { Directive, ElementRef, HostListener, Renderer2, inject, input } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  appTooltip = input('');

  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private renderer = inject(Renderer2);
  private bubble: HTMLElement | null = null;

  /**
   * Retour : void
   * Paramètres : aucun
   * Fonction : crée la bulle <span> contenant le texte et l'ajoute sous l'élément hôte au survol
   */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    const text = this.appTooltip();
    if (!text || this.bubble) return;

    this.bubble = this.renderer.createElement('span');
    this.renderer.appendChild(this.bubble, this.renderer.createText(text));

    this.renderer.setStyle(this.bubble, 'position', 'absolute');
    this.renderer.setStyle(this.bubble, 'top', '100%');
    this.renderer.setStyle(this.bubble, 'left', '0');
    this.renderer.setStyle(this.bubble, 'margin-top', '4px');
    this.renderer.setStyle(this.bubble, 'z-index', '10');
    this.renderer.setStyle(this.bubble, 'width', '16rem');
    this.renderer.setStyle(this.bubble, 'padding', '6px 8px');
    this.renderer.setStyle(this.bubble, 'border-radius', '6px');
    this.renderer.setStyle(this.bubble, 'background-color', '#1f2937');
    this.renderer.setStyle(this.bubble, 'color', '#ffffff');
    this.renderer.setStyle(this.bubble, 'font-size', '12px');

    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.appendChild(this.el.nativeElement, this.bubble);
  }

  /**
   * Retour : void
   * Paramètres : aucun
   * Fonction : supprime la bulle de l'élément hôte quand la souris le quitte
   */
  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (!this.bubble) return;
    this.renderer.removeChild(this.el.nativeElement, this.bubble);
    this.bubble = null;
  }
}