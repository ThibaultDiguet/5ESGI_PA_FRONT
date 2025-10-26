import { computed, Directive } from '@angular/core';
import { HlmInput, inputVariants } from '../../../ui-input-helm/src';
import { hlm } from '../../../ui-utils-helm/src';

@Directive({
	selector: 'input[hlmSidebarInput]',

	host: {
		'data-sidebar': 'input',
		'[class]': '_computedClass()',
	},
})
export class HlmSidebarInput extends HlmInput {
	protected override readonly _computedClass = computed(() =>
		hlm(
			inputVariants({ error: this._state().error }),
			'bg-background focus-visible:ring-sidebar-ring h-8 w-full shadow-none focus-visible:ring-2',
			this.userClass(),
		),
	);
}
