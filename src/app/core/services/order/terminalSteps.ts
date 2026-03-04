import { Injectable } from '@angular/core';

export enum Steps {
  WELCOME = 0,
  SERVICE_MODE = 1,
  AUTHENTICATION = 2,
  AUTHENTICATION_SCAN = 2.1,
  AUTHENTICATION_CODE = 2.2,
  AUTHENTIFICATION_ACCOUNT = 3,
  MENU = 4,
  CHECKOUT = 5,
  CONFIRMATION = 6,
}

@Injectable({
  providedIn: 'root',
})
export class TerminalSteps {
  private step: Steps;

  constructor() {
    this.step = Steps.WELCOME;
  }

  reset() {
    this.step = Steps.WELCOME;
  }

  get() {
    return this.step;
  }

  setAuthentificationMethodToScan() {
    this.step = Steps.AUTHENTICATION_SCAN;
  }

  setAuthentificationMethodToCode() {
    this.step = Steps.AUTHENTICATION_CODE;
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
      case Steps.AUTHENTICATION_SCAN:
        this.step = Steps.MENU;
        break;
      case Steps.AUTHENTICATION_CODE:
        this.step = Steps.MENU;
        break;
      case Steps.AUTHENTIFICATION_ACCOUNT:
        this.step = Steps.MENU;
        break;
      case Steps.MENU:
        this.step = Steps.CHECKOUT;
        break;
      case Steps.CHECKOUT:
        this.step = Steps.CONFIRMATION;
        break;
      case Steps.CONFIRMATION:
        this.step = Steps.WELCOME;
        break;
    }
  }

  back() {
    switch (this.step) {
      case Steps.SERVICE_MODE:
        this.step = Steps.WELCOME;
        break;
      case Steps.AUTHENTICATION:
        this.step = Steps.SERVICE_MODE;
        break;
      case Steps.AUTHENTICATION_SCAN:
        this.step = Steps.AUTHENTICATION;
        break;
      case Steps.AUTHENTICATION_CODE:
        this.step = Steps.AUTHENTICATION;
        break;
      case Steps.AUTHENTIFICATION_ACCOUNT:
        this.step = Steps.AUTHENTICATION;
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
