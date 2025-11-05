import {Restaurant} from './restaurant';
import {Style} from './style';

export type Terminal = {
  name: string;
  uuid: string;
}

export type TerminalConfig = {
  terminal: Terminal;
  restaurant: Restaurant;
  styles: Style[];
}
