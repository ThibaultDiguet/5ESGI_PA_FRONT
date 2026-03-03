import { Injectable } from '@angular/core';

export enum Steps {
  WELCOME = 0,      // Plus accueillant que HOME pour une borne
  SERVICE_MODE = 1, // "Sur place / À emporter" est techniquement un mode de service
  AUTHENTICATION = 2,
  MENU = 3,         // L'étape où l'on choisit les produits
  CHECKOUT = 4,     // Le tunnel de paiement (paiement + validation)
  CONFIRMATION = 5, // Le ticket final / récapitulatif
}

@Injectable({
  providedIn: 'root',
})
export class TerminalSteps {
  private step : Steps;

  constructor() {
    this.step = Steps.WELCOME;
  }

  reset(){
    this.step = Steps.WELCOME;
  }

  get(){
    return this.step;
  }

  next() {
    switch (this.step) {
      case Steps.WELCOME:
        this.step = Steps.SERVICE_MODE;
        break;
      case Steps.SERVICE_MODE:
        this.step = Steps.AUTHENTICATION;
        break;
      case Steps.AUTHENTICATION:
        this.step = Steps.MENU;
        break;
      case Steps.MENU:
        this.step = Steps.CHECKOUT;
        break;
      case Steps.CHECKOUT:
        this.step = Steps.CONFIRMATION;
        break;
      case Steps.CONFIRMATION:
        this.step = Steps.WELCOME
        break;
    }
  }

  back(){
    switch (this.step){
      case Steps.SERVICE_MODE:
        this.step = Steps.WELCOME;
        break;
      case Steps.AUTHENTICATION:
        this.step = Steps.SERVICE_MODE;
        break;
      case Steps.MENU:
        this.step = Steps.AUTHENTICATION;
        break;
      case Steps.CHECKOUT:
        this.step = Steps.MENU;
        break;
      case Steps.CONFIRMATION:
        this.step = Steps.CHECKOUT;
        break;
    }
  }
}
