import { Directive } from '@angular/core';
import { provideHlmIconConfig } from '../../../ui-icon-helm/src';

@Directive({
	selector: '[hlmAlertIcon]',
	providers: [provideHlmIconConfig({ size: 'sm' })],
})
export class HlmAlertIcon {}
