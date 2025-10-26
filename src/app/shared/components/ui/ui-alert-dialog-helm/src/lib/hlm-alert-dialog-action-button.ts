import { Directive } from '@angular/core';
import { HlmButton } from '../../../ui-button-helm/src';

@Directive({
	selector: 'button[hlmAlertDialogAction]',
	hostDirectives: [{ directive: HlmButton, inputs: ['variant', 'size'] }],
})
export class HlmAlertDialogActionButton {}
