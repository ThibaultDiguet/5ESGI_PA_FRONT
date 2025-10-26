import { computed, Directive, input } from '@angular/core';
import { hlm } from '../../../ui-utils-helm/src';
import type { ClassValue } from 'clsx';

@Directive({
	 
	selector: 'hlm-hint',
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmHint {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() => hlm('text-muted-foreground block text-sm', this.userClass()));
}
