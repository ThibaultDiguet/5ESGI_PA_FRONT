import { Injectable } from '@angular/core';
import {Style} from '../types/style';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private readonly root: HTMLElement;
  private readonly originalValues = new Map<string, string>();

  constructor() {
    this.root = typeof document !== 'undefined' ? document.documentElement : ({} as HTMLElement);
  }

  /**
   * Définit une variable CSS (ex: --primary) avec une valeur donnée.
   * Sauvegarde la valeur d’origine la première fois.
   */
  setVariable(variable: string, value: string): void {
    const variableName = variable.startsWith('--') ? variable : `--${variable}`;
    const currentValue = this.getVariable(variableName);

    // Sauvegarde la valeur initiale si c'est la première modification
    if (!this.originalValues.has(variableName) && currentValue !== null) {
      this.originalValues.set(variableName, currentValue);
    }

    this.root.style.setProperty(variableName, value);
  }

  /**
   * Récupère la valeur actuelle d’une variable CSS.
   * Retourne null si absente.
   */
  getVariable(variable: string): string | null {
    if (!variable.startsWith('--')) return null;
    const value = getComputedStyle(this.root).getPropertyValue(variable);
    return value.trim() || null;
  }

  /**
   * Supprime la valeur personnalisée (reviendra à la valeur CSS par défaut).
   */
  removeVariable(variable: string): void {
    if (!variable.startsWith('--')) return;
    this.root.style.removeProperty(variable);
  }

  /**
   * Réinitialise toutes les variables modifiées à leur valeur d’origine.
   */
  resetAll(): void {
    this.originalValues.forEach((value, key) => {
      this.root.style.setProperty(key, value);
    });
    this.originalValues.clear();
  }

  /**
   * Réinitialise une seule variable à sa valeur d’origine.
   */
  resetVariable(variable: string): void {
    const original = this.originalValues.get(variable);
    if (original !== undefined) {
      this.root.style.setProperty(variable, original);
      this.originalValues.delete(variable);
    } else {
      // Si elle n’a jamais été modifiée via ce service, on la supprime simplement
      this.root.style.removeProperty(variable);
    }
  }

  applyStyles(styles: Style[]): void {
    for (const style of styles) {
      this.setVariable(style.name, style.style_value);
    }
  }
}
