import { Restaurant } from './restaurant';
import { Style } from './style';

export interface Terminal {
  name: string;
  uuid: string;
}

export interface TerminalConfig {
  terminal: Terminal;
  restaurant: Restaurant;
  styles: Style[];
}

export enum ServiceMode {
  TAKEAWAY = 'takeaway',
  DINE_IN = 'dine-in',
}
