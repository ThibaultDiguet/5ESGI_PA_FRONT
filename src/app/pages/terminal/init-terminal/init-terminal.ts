import {Component} from '@angular/core';
import {InitTerminalWrapper} from '../../../features/terminal/init-terminal-wrapper/init-terminal-wrapper';

@Component({
  selector: 'app-register-terminal',
  imports: [
    InitTerminalWrapper
  ],
  templateUrl: './init-terminal.html'
})
export class InitTerminal {

}
